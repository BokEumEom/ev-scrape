# app/api/v1/endpoints/community_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, AsyncGenerator
from .... import crud, schemas
from app.database import SessionLocal

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session

@router.get("", response_model=schemas.CommunityPostsResponse[schemas.CommunityPost])  # 스키마 타입을 올바르게 지정하세요.
async def read_community_posts(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    posts, total_count = await crud.get_community_posts_with_count(db, skip=skip, limit=limit)
    total_pages = (total_count + limit - 1) // limit  # 총 페이지 수 계산
    return schemas.CommunityPostsResponse(items=posts, total=total_pages)  # 여기서 total=total_pages 로 변경

@router.get("/{post_id}", response_model=schemas.CommunityPost)
async def read_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.get_community_post(db, post_id)

@router.post("", response_model=schemas.CommunityPost)
async def create_community_post(post: schemas.CommunityPostCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_community_post(db, post)

@router.put("/{post_id}", response_model=schemas.CommunityPost)
async def update_community_post(post_id: int, post: schemas.CommunityPostCreate, db: AsyncSession = Depends(get_db)):
    return await crud.update_community_post(db, post_id, post)

@router.delete("/{post_id}", response_model=schemas.CommunityPost)
async def delete_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_community_post(db, post_id)
