# app/schemas.py
from pydantic import BaseModel
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
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class CommunityPostsResponse(GenericModel, Generic[DataT]):
    items: List[DataT]
    total: int