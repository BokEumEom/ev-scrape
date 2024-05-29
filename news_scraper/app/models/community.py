# app/models/community.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class CommunityPost(Base):
    __tablename__ = 'community_posts'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())  # Default value for created_at
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())  # Default value for updated_at
    likeCount = Column(Integer, default=0)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Foreign key

    user = relationship("User", back_populates="posts")
    likes = relationship("CommunityPostLike", back_populates="post", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan", order_by="Comment.created_at")

class CommunityPostLike(Base):
    __tablename__ = 'community_post_likes'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)
    created_at = Column(DateTime, default=func.now())
    post = relationship("CommunityPost", back_populates="likes")

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships
    post = relationship("CommunityPost", back_populates="comments")
