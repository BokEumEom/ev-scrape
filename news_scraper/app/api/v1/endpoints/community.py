# app/api/v1/endpoints/community.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, AsyncGenerator
from app import schemas
from app.crud import community as crud
from app.config import get_logger
from app.database import SessionLocal
from app.core.security import get_current_user

logger = get_logger()

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.get("", response_model=schemas.CommunityPostsResponse)
async def read_community_posts(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    posts_with_counts, total_count = await crud.get_community_posts_with_count(db, skip=skip, limit=limit)
    return {'items': posts_with_counts, 'total': total_count}

@router.get("/user/posts", response_model=List[schemas.CommunityPost])
async def read_user_posts(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    user_id = current_user.id
    posts = await crud.get_user_posts(db, user_id=user_id, skip=skip, limit=limit)
    return posts

@router.get("/{post_id}", response_model=schemas.CommunityPost)
async def read_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await crud.get_community_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

    like_count = await crud.get_like_count(db, post_id)
    comment_count = await crud.get_comment_count(db, post_id)

    post_data = jsonable_encoder(post)
    post_data['likeCount'] = like_count
    post_data['commentCount'] = comment_count
    
    return schemas.CommunityPost.parse_obj(post_data)

@router.post("", response_model=schemas.CommunityPost)
async def create_community_post(
    post: schemas.CommunityPostCreate, 
    db: AsyncSession = Depends(get_db), 
    current_user: schemas.User = Depends(get_current_user)
):
    created_post = await crud.create_community_post(db, post, user_id=current_user.id)
    return created_post

@router.put("/{post_id}", response_model=schemas.CommunityPost)
async def update_community_post(post_id: int, post: schemas.CommunityPostUpdate, db: AsyncSession = Depends(get_db)):
    updated_post = await crud.update_community_post(db, post_id, post)
    if not updated_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return updated_post

@router.delete("/{post_id}", response_model=schemas.CommunityPost)
async def delete_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_community_post(db, post_id)

@router.post("/{post_id}/like", response_model=schemas.CommunityPost)
async def like_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await crud.like_community_post(db, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post

@router.post("/{post_id}/comments", response_model=schemas.Comment)
async def create_comment(post_id: int, comment: schemas.CommentCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_comment(db, post_id, comment)

@router.get("/{post_id}/comments", response_model=List[schemas.Comment])
async def read_comments(post_id: int, db: AsyncSession = Depends(get_db)):
    comments = await crud.get_comments_by_post_id(db, post_id)
    return comments

@router.delete("/comments/{comment_id}", response_model=schemas.Comment)
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    deleted_comment = await crud.delete_comment(db, comment_id)
    if not deleted_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    return deleted_comment
