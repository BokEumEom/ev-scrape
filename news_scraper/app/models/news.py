# app/models/news.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    source = Column(String, nullable=False)
    link = Column(String, nullable=False)
    published_at = Column(DateTime, server_default=func.now())
    votes = relationship("Vote", back_populates="news")

class Vote(Base):
    __tablename__ = 'votes'
    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, ForeignKey('news.id'))
    vote_value = Column(Integer, default=0)  # +1 for upvote, -1 for downvote
    news = relationship("News", back_populates="votes")

class Like(Base):
    __tablename__ = 'likes'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)
    
class Region(Base):
    __tablename__ = "regions"
    name = Column(String, primary_key=True, index=True)