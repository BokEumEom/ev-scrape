from sqlalchemy.orm import Session
from ..models import models
from ..schemas import news_schema  # 가정한 스키마 파일

def get_news(db: Session, news_id: int):
    return db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()

def get_news_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.NewsItem).offset(skip).limit(limit).all()

def create_news(db: Session, news: news_schema.NewsCreate):
    db_news = models.NewsItem(**news.dict())
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news

# 여기에 더 많은 CRUD 연산 함수 추가...
