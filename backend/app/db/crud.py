# /app/db/crud.py
from sqlalchemy.orm import Session
from app.models.news import News
from app.schemas.schemas import NewsCreate

def create_news(db: Session, news_create: NewsCreate):
    news = News(**news_create.dict())
    db.add(news)
    db.commit()
    db.refresh(news)
    return news

def get_news(db: Session, skip: int = 0, limit: int = 10):
    return db.query(News).offset(skip).limit(limit).all()

def get_news_count(db: Session) -> int:
    return db.query(News).count()
