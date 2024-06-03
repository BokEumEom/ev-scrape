# app/crud/news.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.schemas.news import NewsCreate
from app.models.news import News, Vote
from datetime import datetime
from typing import List

async def create_news(db: AsyncSession, news: NewsCreate):
    """
    Create a new news item and add it to the database.
    """
    # Using the current time as the publish date
    db_news = News(published_at=datetime.now(), **news.model_dump())
    db.add(db_news)
    await db.commit()
    await db.refresh(db_news)
    return db_news

async def get_news(db: AsyncSession, skip: int = 0, limit: int = 100):
    """
    Asynchronously fetch news items from the database.
    """
    query = select(News).order_by(News.published_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    news_items = result.scalars().all()
    return news_items

async def get_news_count(db: AsyncSession):
    """
    Asynchronously get the total count of news items in the database.
    """
    query = select(func.count()).select_from(News)
    result = await db.execute(query)
    total_count = result.scalar_one()
    return total_count

async def get_news_by_id(db: AsyncSession, news_id: int):
    """
    Asynchronously fetch a single news item by ID from the database.
    """
    query = select(News).where(News.id == news_id)
    result = await db.execute(query)
    news_item = result.scalars().first()
    return news_item

async def update_news(db: AsyncSession, news_id: int, updated_news: NewsCreate):
    """
    Asynchronously update a news item.
    """
    query = select(News).where(News.id == news_id)
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
    query = select(News).where(News.id == news_id)
    result = await db.execute(query)
    db_news = result.scalars().first()
    if db_news:
        await db.delete(db_news)
        await db.commit()
    return db_news

async def vote_news(db: AsyncSession, news_id: int, vote_value: int):
    # Check if the news item exists
    news_item = await db.execute(select(News).filter(News.id == news_id))
    news_item = news_item.scalars().first()
    if not news_item:
        return None

    # Check if a vote for this news item already exists
    vote_item_result = await db.execute(select(Vote).filter(Vote.news_id == news_id))
    vote_item = vote_item_result.scalars().first()

    if vote_item:
        # Update the existing vote
        vote_item.vote_value += vote_value
    else:
        # Create a new vote entry
        new_vote = Vote(news_id=news_id, vote_value=vote_value)
        db.add(new_vote)

    await db.commit()

    # Recalculate and update the vote count
    vote_count_result = await db.execute(select(func.sum(Vote.vote_value)).where(Vote.news_id == news_id))
    vote_count = vote_count_result.scalar() or 0
    news_item.voteCount = vote_count

    await db.commit()
    await db.refresh(news_item)

    return news_item