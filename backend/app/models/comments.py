# app/models/comment.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, ForeignKey("announcements.id"), nullable=False)
    content = Column(String, nullable=False)
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)