# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime
import pytz

# Get the KST timezone
kst = pytz.timezone('Asia/Seoul')

class Region(Base):
    __tablename__ = "regions"
    name = Column(String, primary_key=True, index=True)

class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    source = Column(String, nullable=False)
    link = Column(String, nullable=False)
    published_at = Column(DateTime)
    votes = relationship("Vote", back_populates="news")

class Vote(Base):
    __tablename__ = 'votes'
    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, ForeignKey('news.id'))
    vote_value = Column(Integer, default=0)  # +1 for upvote, -1 for downvote
    news = relationship("News", back_populates="votes")

class CommunityPost(Base):
    __tablename__ = 'community_posts'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(kst))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(kst), onupdate=lambda: datetime.datetime.now(kst))