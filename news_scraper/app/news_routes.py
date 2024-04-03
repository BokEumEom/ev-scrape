# app/news_routers.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, AsyncGenerator
from . import crud, schemas, models
from .database import SessionLocal

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session

@router.post("/", response_model=schemas.News, status_code=status.HTTP_201_CREATED)
async def create_news_item(news: schemas.NewsCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_news(db=db, news=news)

@router.get("/", response_model=schemas.NewsResponse[schemas.News])  # Adjust this line
async def read_news(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    items = await crud.get_news(db=db, skip=skip, limit=limit)
    total = await crud.get_news_count(db=db)
    return schemas.NewsResponse(items=items, total=total)  # Adjust this line

@router.get("/{news_id}", response_model=schemas.News)
async def read_news_item(news_id: int, db: AsyncSession = Depends(get_db)):
    db_news = await crud.get_news_by_id(db=db, news_id=news_id)
    if db_news is None:
        raise HTTPException(status_code=404, detail="News item not found")
    return db_news

@router.put("/{news_id}", response_model=schemas.News)
async def update_news_item(news_id: int, news: schemas.NewsCreate, db: AsyncSession = Depends(get_db)):
    return await crud.update_news(db=db, news_id=news_id, updated_news=news)

@router.delete("/{news_id}", response_model=schemas.News)
async def delete_news_item(news_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_news(db=db, news_id=news_id)

@router.get("/search/", response_model=List[schemas.News])
async def search_news(query: str = Query(...), db: AsyncSession = Depends(get_db)):
    news_query = select(models.News).where(models.News.title.contains(query)).limit(10)
    result = await db.execute(news_query)
    news_items = result.scalars().all()
    if not news_items:
        raise HTTPException(status_code=404, detail="No news found for your search")
    return news_items

@router.post("/{news_id}/vote", response_model=schemas.News)
async def vote_on_news(news_id: int, vote: schemas.VoteCreate, db: AsyncSession = Depends(get_db)):
    news_item = await crud.vote_news(db=db, news_id=news_id, vote_value=vote.vote_value)
    if not news_item:
        raise HTTPException(status_code=404, detail="News item not found")
    return news_item  # Directly return the ORM model, FastAPI will convert it based on your Pydantic schema