# app/models.py
from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class News(Base):
    __tablename__ = 'news'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    source = Column(String, nullable=False)
    link = Column(String, nullable=False)
    published_at = Column(DateTime)
