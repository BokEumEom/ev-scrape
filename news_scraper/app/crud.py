# app/crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas
from datetime import datetime

async def create_news(db: AsyncSession, news: schemas.NewsCreate):
    """
    Create a new news item and add it to the database.
    """
    # Using the current time as the publish date
    db_news = models.News(published_at=datetime.now(), **news.dict())
    db.add(db_news)
    await db.commit()
    await db.refresh(db_news)
    return db_news

async def get_news(db: AsyncSession, skip: int = 0, limit: int = 100):
    """
    Asynchronously fetch news items from the database.
    """
    query = select(models.News).order_by(models.News.published_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)  # Make sure to await the execution
    news_items = result.scalars().all()
    return news_items

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
        update_data = updated_news.dict(exclude_unset=True)
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
