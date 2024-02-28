from sqlalchemy.orm import Session
from . import models, schemas

def get_news_item(db: Session, news_id: int):
    return db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()

def get_news_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.NewsItem).offset(skip).limit(limit).all()

def create_news_item(db: Session, news_item: schemas.NewsItemCreate):
    db_news_item = models.NewsItem(**news_item.dict())
    db.add(db_news_item)
    db.commit()
    db.refresh(db_news_item)
    return db_news_item

def update_news_item(db: Session, news_id: int, news_item: schemas.NewsItemUpdate):
    db_news_item = db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()
    if db_news_item:
        update_data = news_item.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_news_item, key, value)
        db.commit()
        db.refresh(db_news_item)
    return db_news_item

def delete_news_item(db: Session, news_id: int):
    db_news_item = db.query(models.NewsItem).filter(models.NewsItem.id == news_id).first()
    if db_news_item:
        db.delete(db_news_item)
        db.commit()
    return db_news_item
