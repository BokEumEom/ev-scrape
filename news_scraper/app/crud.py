# app/crud.py
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, func
from . import models, schemas
from datetime import datetime
from typing import List

async def create_news(db: AsyncSession, news: schemas.NewsCreate):
    """
    Create a new news item and add it to the database.
    """
    # Using the current time as the publish date
    db_news = models.News(published_at=datetime.now(), **news.model_dump())
    db.add(db_news)
    await db.commit()
    await db.refresh(db_news)
    return db_news

async def get_news(db: AsyncSession, skip: int = 0, limit: int = 100):
    """
    Asynchronously fetch news items from the database.
    """
    query = select(models.News).order_by(models.News.published_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    news_items = result.scalars().all()
    return news_items

async def get_news_count(db: AsyncSession):
    """
    Asynchronously get the total count of news items in the database.
    """
    query = select(func.count()).select_from(models.News)
    result = await db.execute(query)
    total_count = result.scalar_one()
    return total_count

async def get_news_by_id(db: AsyncSession, news_id: int):
    """
    Asynchronously fetch a single news item by ID from the database.
    """
    query = select(models.News).where(models.News.id == news_id)
    result = await db.execute(query)
    news_item = result.scalars().first()
    return news_item

async def update_news(db: AsyncSession, news_id: int, updated_news: schemas.NewsCreate):
    """
    Asynchronously update a news item.
    """
    query = select(models.News).where(models.News.id == news_id)
    result = await db.execute(query)
    db_news = result.scalars().first()
    if db_news:
        # Apply the updates from updated_news to db_news
        update_data = updated_news.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_news, key, value)
        await db.commit()
        return db_news
    return None  # Return None if the news item does not exist

async def delete_news(db: AsyncSession, news_id: int):
    """
    비동기 방식으로 특정 ID를 가진 뉴스 아이템을 데이터베이스에서 삭제합니다.
    """
    query = select(models.News).where(models.News.id == news_id)
    result = await db.execute(query)
    db_news = result.scalars().first()
    if db_news:
        await db.delete(db_news)
        await db.commit()
    return db_news

async def vote_news(db: AsyncSession, news_id: int, vote_value: int):
    # Check if the news item exists
    news_item = await db.execute(select(models.News).filter(models.News.id == news_id))
    news_item = news_item.scalars().first()
    if not news_item:
        return None

    # Check if a vote for this news item already exists
    vote_item_result = await db.execute(select(models.Vote).filter(models.Vote.news_id == news_id))
    vote_item = vote_item_result.scalars().first()

    if vote_item:
        # Update the existing vote
        vote_item.vote_value += vote_value
    else:
        # Create a new vote entry
        new_vote = models.Vote(news_id=news_id, vote_value=vote_value)
        db.add(new_vote)

    await db.commit()

    # Recalculate and update the vote count
    vote_count_result = await db.execute(select(func.sum(models.Vote.vote_value)).where(models.Vote.news_id == news_id))
    vote_count = vote_count_result.scalar() or 0
    news_item.voteCount = vote_count

    await db.commit()
    await db.refresh(news_item)

    return news_item

# Community
async def get_community_posts(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(
        select(models.CommunityPost)
        .order_by(models.CommunityPost.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def get_community_post(db: AsyncSession, post_id: int):
    result = await db.execute(
        select(models.CommunityPost).where(models.CommunityPost.id == post_id)
    )
    return result.scalars().first()

from sqlalchemy import select, func
from .models import CommunityPost, CommunityPostLike, Comment

async def get_community_posts_with_count(db: AsyncSession, skip: int = 0, limit: int = 10):
    # Construct a query that joins CommunityPost with CommunityPostLike and Comment
    # and calculates the count of likes and comments for each post.
    posts_query = (
        select([
            CommunityPost,
            func.count(CommunityPostLike.id).label('like_count'),
            func.count(Comment.id).label('comment_count')
        ])
        .outerjoin(CommunityPostLike, CommunityPostLike.post_id == CommunityPost.id)
        .outerjoin(Comment, Comment.post_id == CommunityPost.id)
        .group_by(CommunityPost.id)
        .order_by(CommunityPost.created_at.desc())
        .offset(skip)
        .limit(limit)
    )

    # Also fetch the total count of posts to facilitate pagination
    total_count_query = select(func.count()).select_from(CommunityPost)

    # Execute the query to fetch posts with like and comment counts
    posts_result = await db.execute(posts_query)
    posts_with_counts = posts_result.all()  # Returns tuples of (CommunityPost, like_count, comment_count)

    # Execute the query to fetch total count of posts
    total_count_result = await db.execute(total_count_query)
    total_count = total_count_result.scalar_one()

    # Structure the results to include the like and comment counts directly in the post data
    formatted_posts = []
    for post, like_count, comment_count in posts_with_counts:
        post_data = jsonable_encoder(post)
        post_data['likeCount'] = like_count
        post_data['commentCount'] = comment_count
        formatted_posts.append(post_data)

    return formatted_posts, total_count

async def create_community_post(db: AsyncSession, post_data: schemas.CommunityPostCreate):
    try:
        # Here, ensure that db.commit() is called after db.add() without prematurely closing the transaction
        new_post = models.CommunityPost(**post_data.model_dump())
        db.add(new_post)
        await db.commit()
        await db.refresh(new_post)
        return new_post
    except Exception as e:
        await db.rollback()
        raise

async def update_community_post(db: AsyncSession, post_id: int, post_update_data: schemas.CommunityPostCreate):
    """
    Updates a specific community post with new data within a transaction.

    This function ensures that the update operation is atomic and consistent by using a transaction.
    Changes are committed only if the entire operation is successful; otherwise, changes are rolled back
    to avoid partial updates in case of an error, thus maintaining database integrity.

    Parameters:
    db (AsyncSession): The database session used to execute database operations.
    post_id (int): The ID of the post to update.
    post_update_data (schemas.CommunityPostCreate): The new data for the post.

    Returns:
    models.CommunityPost: The updated post object if the update is successful.
    None: If the post does not exist.

    Raises:
    HTTPException: If the post cannot be found (404) or if there is a database error (500).
    """
    async with db.begin() as transaction:
        try:
            existing_post = await db.get(CommunityPost, post_id)
            if not existing_post:
                raise HTTPException(status_code=404, detail="Post not found")

            for key, value in post_update_data.dict(exclude_unset=True).items():
                setattr(existing_post, key, value)

            existing_post.updated_at = datetime.utcnow()  # Ensure updated_at is refreshed
            await db.commit()  # Commit the updates
            return existing_post
        except Exception as e:
            await transaction.rollback()  # Rollback in case of any exception
            raise HTTPException(status_code=500, detail=str(e))

async def delete_community_post(db: AsyncSession, post_id: int):
    """
    Deletes a specific post by ID. This endpoint ensures idempotence by returning a successful
    response even if the post has already been deleted or does not exist.

    The function uses a transaction to ensure the delete operation is atomic. If an error occurs
    during the operation, the transaction is rolled back to prevent any partial deletion.

    Parameters:
    post_id (int): The ID of the post to be deleted.

    Returns:
    schemas.CommunityPost: The deleted post object if the delete operation is successful.
    HTTPException: If there is a database error.

    Note: The function is designed to handle cases where the post does not exist by treating
    such cases as successful deletions, thus maintaining idempotence.
    """
    async with db.begin() as transaction:
        post_to_delete = await db.get(CommunityPost, post_id)
        if not post_to_delete:
            return {"detail": "Post not found or already deleted"}  # Idempotent response

        await db.delete(post_to_delete)
        await db.commit()  # Commit the deletion
        return {"detail": "Post deleted successfully"}

async def like_community_post(db: AsyncSession, post_id: int) -> models.CommunityPost:
    # 게시물이 존재하는지 확인
    post = await db.get(CommunityPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    try:
        # 기존의 like 추가 코드
        existing_like = await db.execute(
            select(CommunityPostLike)
            .where(CommunityPostLike.post_id == post_id)
        )
        existing_like = existing_like.scalars().first()

        if existing_like:
            raise HTTPException(status_code=400, detail="User has already liked this post")

        new_like = CommunityPostLike(post_id=post_id)
        db.add(new_like)
        await db.commit()

        # Update the post like count (optional, if you want to cache the like count in the post)
        post.likeCount += 1
        await db.commit()
        await db.refresh(post)

        return post
    except IntegrityError as e:
        # 유니크 제약 조건 위반 시 처리
        await db.rollback()
        raise HTTPException(status_code=409, detail="User has already liked this post")
    except Exception as e:
        # 기타 예외 처리
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

async def create_comment(db: AsyncSession, post_id: int, comment_data: schemas.CommentCreate):
    try:
        new_comment = models.Comment(post_id=post_id, **comment_data.model_dump())
        db.add(new_comment)
        await db.commit()
        await db.refresh(new_comment)
        return new_comment
    except Exception as e:
        await db.rollback()
        raise

async def get_comments_by_post_id(db: AsyncSession, post_id: int):
    result = await db.execute(
        select(models.Comment).filter(models.Comment.post_id == post_id)
    )
    comments = result.scalars().all()
    return comments

async def delete_comment(db: AsyncSession, comment_id: int) -> schemas.Comment:
    async with db.execute(select(schemas.Comment).filter(schemas.Comment.id == comment_id)) as result:
        comment = result.scalars().first()
        if comment:
            await db.delete(comment)
            await db.commit()
    return comment

async def get_like_count(db: AsyncSession, post_id: int) -> int:
    result = await db.execute(select(func.count()).filter(models.Like.post_id == post_id))
    return result.scalar_one()

async def get_comment_count(db: AsyncSession, post_id: int) -> int:
    result = await db.execute(select(func.count()).filter(models.Comment.post_id == post_id))
    return result.scalar_one()

# Announcements Regions
def get_regions(db: AsyncSession):
    return db.query(models.Region).all()