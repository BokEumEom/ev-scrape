# app/crud/community.py
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError
from app.schemas import CommunityPostUpdate, CommunityPostCreate, Comment, CommentCreate
from sqlalchemy import select, func
from app.models.community import CommunityPost, CommunityPostLike, Comment
from app.models.news import Like
from datetime import datetime

async def get_community_posts(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(
        select(CommunityPost)
        .order_by(CommunityPost.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def get_community_post(db: AsyncSession, post_id: int):
    result = await db.execute(
        select(CommunityPost).where(CommunityPost.id == post_id)
    )
    return result.scalars().first()

async def get_community_posts_with_count(db: AsyncSession, skip: int = 0, limit: int = 10):
    # Construct a query that calculates the count of likes and comments for each post.
    posts_query = (
        select(
            CommunityPost, 
            func.count(CommunityPostLike.id).label('like_count'),
            func.count(Comment.id).label('comment_count')
        )
        .outerjoin(CommunityPostLike, CommunityPostLike.post_id == CommunityPost.id)
        .outerjoin(Comment, Comment.post_id == CommunityPost.id)
        .group_by(CommunityPost.id)
        .order_by(CommunityPost.created_at.desc())
        .offset(skip)
        .limit(limit)
    )

    # Execute the query to fetch posts with like and comment counts
    result = await db.execute(posts_query)
    posts_with_counts = result.all()  # Returns tuples of (CommunityPost, like_count, comment_count)

    # Also fetch the total count of posts to facilitate pagination
    total_count_query = select(func.count()).select_from(CommunityPost)
    total_count_result = await db.execute(total_count_query)
    total_count = total_count_result.scalar_one()

    # Formatting the results correctly
    formatted_posts = [{
        **jsonable_encoder(post),
        'likeCount': like_count,
        'commentCount': comment_count
    } for post, like_count, comment_count in posts_with_counts]

    return formatted_posts, total_count

async def create_community_post(db: AsyncSession, post_data: CommunityPostCreate, user_id: int):
    try:
        new_post = CommunityPost(
            **post_data.dict(),
            user_id=user_id,
            created_at=datetime.now(),  # Set created_at to current datetime
            updated_at=datetime.now()   # Set updated_at to current datetime
        )
        db.add(new_post)
        await db.commit()
        await db.refresh(new_post)
        return new_post
    except Exception as e:
        await db.rollback()
        raise

async def update_community_post(db: AsyncSession, post_id: int, post_update_data: CommunityPostUpdate) -> CommunityPost:
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
    async with db.begin():  # 시작: 비동기 트랜잭션
        # `get` 메서드를 사용하여 특정 포스트를 조회합니다.
        existing_post = await db.get(CommunityPost, post_id)
        if not existing_post:
            raise HTTPException(status_code=404, detail="Post not found")

        # JSON 인코더를 사용하여 Pydantic 모델에서 변경할 데이터를 추출합니다.
        update_data = jsonable_encoder(post_update_data, exclude_unset=True)
        
        # 변환된 데이터로 기존 포스트 객체의 속성을 업데이트합니다.
        for key, value in update_data.items():
            setattr(existing_post, key, value)

        # `add`를 호출하여 세션에 변경사항을 추가하고 커밋합니다.
        db.add(existing_post)

    # 변경사항이 커밋된 후, 업데이트된 객체를 반환합니다.
    await db.refresh(existing_post)
    return existing_post

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

async def like_community_post(db: AsyncSession, post_id: int) -> CommunityPost:
    # 게시물이 존재하는지 확인
    post = await db.get(CommunityPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    try:
        # 기존의 좋아요 추가 코드
        existing_like = await db.execute(
            select(CommunityPostLike).where(CommunityPostLike.post_id == post_id)
        )
        existing_like = existing_like.scalars().first()

        if existing_like:
            raise HTTPException(status_code=400, detail="User has already liked this post")

        new_like = CommunityPostLike(post_id=post_id)
        db.add(new_like)

        # 좋아요 수 증가
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

async def create_comment(db: AsyncSession, post_id: int, comment_data: CommentCreate):
    try:
        new_comment = Comment(post_id=post_id, **comment_data.model_dump())
        db.add(new_comment)
        await db.commit()
        await db.refresh(new_comment)
        return new_comment
    except Exception as e:
        await db.rollback()
        raise

async def get_comments_by_post_id(db: AsyncSession, post_id: int):
    result = await db.execute(
        select(Comment).filter(Comment.post_id == post_id)
    )
    comments = result.scalars().all()
    return comments

async def delete_comment(db: AsyncSession, comment_id: int) -> Comment:
    async with db.execute(select(Comment).filter(Comment.id == comment_id)) as result:
        comment = result.scalars().first()
        if comment:
            await db.delete(comment)
            await db.commit()
    return comment

async def get_like_count(db: AsyncSession, post_id: int) -> int:
    result = await db.execute(select(func.count()).filter(Like.post_id == post_id))
    return result.scalar_one()

async def get_comment_count(db: AsyncSession, post_id: int) -> int:
    result = await db.execute(select(func.count()).filter(Comment.post_id == post_id))
    return result.scalar_one()