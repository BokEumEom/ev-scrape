# app/main.py
from typing import List, AsyncGenerator
from fastapi import FastAPI, Depends, HTTPException, status
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
import asyncio

from . import crud, schemas
from .database import Base, engine, SessionLocal  
from .rss_scheduler import start_rss_feed_scheduler
from .config import get_logger
from fastapi.middleware.cors import CORSMiddleware

logger = get_logger()

@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # Create database tables asynchronously
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    logger.info("Application started")
    # Starting RSS feed scheduler in the background
    task = asyncio.create_task(start_rss_feed_scheduler())
    
    yield
    
    # Cleanup actions before the application completely stops
    task.cancel()
    logger.info("Application stopped")

app = FastAPI(lifespan=app_lifespan)

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, specify your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session

@app.post("/news", response_model=schemas.News, status_code=status.HTTP_201_CREATED)
def create_news_item(news: schemas.NewsCreate, db: AsyncSession = Depends(get_db)):
    return crud.create_news(db=db, news=news)

@app.get("/news", response_model=List[schemas.News])
async def read_news(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    news_items = await crud.get_news(db=db, skip=skip, limit=limit)  # Add 'await' here
    return news_items

@app.get("/news/{news_id}", response_model=schemas.News)
async def read_news_item(news_id: int, db: AsyncSession = Depends(get_db)):
    db_news = await crud.get_news_by_id(db=db, news_id=news_id)  # Correctly awaited
    if db_news is None:
        raise HTTPException(status_code=404, detail="News item not found")
    return db_news

@app.put("/news/{news_id}", response_model=schemas.News)
async def update_news_item(news_id: int, news: schemas.NewsCreate, db: AsyncSession = Depends(get_db)):
    updated_news = await crud.update_news(db=db, news_id=news_id, updated_news=news)  # Use await here
    if updated_news is None:
        raise HTTPException(status_code=404, detail="News item not found")
    return updated_news

@app.delete("/news/{news_id}", response_model=schemas.News)
def delete_news_item(news_id: int, db: AsyncSession = Depends(get_db)):
    deleted_news = crud.delete_news(db=db, news_id=news_id)
    if deleted_news is None:
        raise HTTPException(status_code=404, detail="News item not found")
    return deleted_news
