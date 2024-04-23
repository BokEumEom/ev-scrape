# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, UniqueConstraint
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
    
class Like(Base):
    __tablename__ = 'likes'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)

class CommunityPost(Base):
    __tablename__ = 'community_posts'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(kst))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(kst), onupdate=lambda: datetime.datetime.now(kst))
    
    # Relationships
    likes = relationship("CommunityPostLike", back_populates="post", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    # Dynamic properties to automatically count likes and comments
    @property
    def like_count(self):
        return len(self.likes)

    @property
    def comment_count(self):
        return len(self.comments)
    
class CommunityPostLike(Base):
    __tablename__ = 'community_post_likes'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # 사용자 ID 열 추가
    created_at = Column(DateTime, default=datetime.datetime.now(kst))
    post = relationship("CommunityPost", back_populates="likes")

    __table_args__ = (
        UniqueConstraint('post_id', 'user_id', name='uix_post_user_like'),  # 복합 유니크 제약 조건 추가
    )
    
CommunityPost.likes = relationship("CommunityPostLike", back_populates="post")

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('community_posts.id'), nullable=False)
    content = Column(Text, nullable=False)  # Now Text is properly imported and recognized
    author = Column(String, nullable=True)  # Optional: Include if comments have visible authors
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(kst))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(kst), onupdate=lambda: datetime.datetime.now(kst))

    # Relationships
    post = relationship("CommunityPost", back_populates="comments")

# Adding the relationship to the CommunityPost model
CommunityPost.comments = relationship("Comment", back_populates="post", order_by=Comment.created_at)