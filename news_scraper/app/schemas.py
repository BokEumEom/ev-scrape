# app/schemas.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Generic, TypeVar, Generic, Optional
from pydantic.generics import GenericModel

DataT = TypeVar('DataT')

# News
class NewsBase(BaseModel):
    title: str
    source: str
    link: str

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    published_at: datetime
    voteCount: Optional[int] = None  # Assuming this is dynamically calculated

    class Config:
        orm_mode = True

class NewsResponse(GenericModel, Generic[DataT]):
    items: List[DataT]
    total: int

# Vote
class VoteCreate(BaseModel):
    vote_value: int  # Can be 1 for upvote and -1 for downvote

    class Config:
        orm_mode = True  # To allow ORM models to be used with these schemas
        
# Community
class CommunityPostBase(BaseModel):
    title: str
    content: str

class CommunityPostCreate(CommunityPostBase):
    pass

class CommunityPost(CommunityPostBase):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime]
    likeCount: Optional[int] = Field(default=0, alias='like_count')
    commentCount: Optional[int] = Field(default=0, alias='comment_count')

    class Config:
        orm_mode = True

class CommunityPostsResponse(BaseModel):
    items: List[CommunityPost]
    total: int
    
class CommentBase(BaseModel):
    content: str

class CommentCreate(BaseModel):
    content: str

class Comment(CommentBase):
    id: int
    post_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True