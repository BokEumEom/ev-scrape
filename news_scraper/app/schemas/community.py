# app/schemas/community.py
from pydantic import BaseModel, Field, PositiveInt, PositiveFloat
from datetime import datetime
from typing import List, Generic, TypeVar, Generic, Optional
from pydantic.generics import GenericModel

DataT = TypeVar('DataT')

class CommunityPostBase(BaseModel):
    title: str
    content: str

class CommunityPostCreate(BaseModel):
    title: str
    content: str

class CommunityPost(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime]
    likeCount: int = 0
    commentCount: int = 0

    class Config:
        from_attributes = True

class CommunityPostsResponse(BaseModel):
    items: List[CommunityPost]
    total: int
    
class CommunityPostUpdate(BaseModel):
    title: Optional[str] = Field(None, title="The title of the post")
    content: Optional[str] = Field(None, title="The content of the post")
    updated_at: Optional[datetime] = Field(default_factory=datetime.now, title="The time of the update")
    
    # Optional: 다른 필드가 필요하다면 여기에 추가하세요.

    class Config:
        from_attributes = True
    
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
        from_attributes = True