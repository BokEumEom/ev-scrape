# app/crud/users.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select
from app.models.users import User
from app.models.community import CommunityPost
from app.schemas.users import UserCreate
from typing import List

async def get_user(db: AsyncSession, user_id: int) -> User:
    result = await db.execute(select(User).filter(User.id == user_id))
    return result.scalars().first()

async def get_user_by_email(db: AsyncSession, email: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    db_user = User(email=user.email, username=user.username)
    db_user.set_password(user.password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_users(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()

async def get_user_posts(db: AsyncSession, user_id: int, skip: int = 0, limit: int = 10) -> List[CommunityPost]:
    result = await db.execute(
        select(CommunityPost)
        .where(CommunityPost.user_id == user_id)
        .order_by(CommunityPost.created_at.desc())
        .offset(skip)
        .limit(limit)
        .options(joinedload(CommunityPost.user))
    )
    return result.scalars().all()
