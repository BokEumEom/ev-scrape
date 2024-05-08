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

class CommunityPost(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime]
    likeCount: int = 0
    commentCount: int = 0

    class Config:
        orm_mode = True

class CommunityPostsResponse(BaseModel):
    items: List[CommunityPost]
    total: int
    
class CommunityPostUpdate(BaseModel):
    title: Optional[str] = Field(None, title="The title of the post")
    content: Optional[str] = Field(None, title="The content of the post")
    updated_at: Optional[datetime] = Field(default_factory=datetime.now, title="The time of the update")
    
    # Optional: 다른 필드가 필요하다면 여기에 추가하세요.

    class Config:
        orm_mode = True
    
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
        
# Vehicle
class VehicleSpecCreate(BaseModel):
    manufacturer: str
    model: str
    drive_type: str
    battery_type: str
    range_km: float
    acceleration: float
    weight_kg: float
    storage_l: int
    wheel_size: str
    seating_capacity: int
    display_inch: float
    minimum_ground_clearance_mm: int
    width_mm: int
    height_mm: int
    length_mm: int
    track_mm_front: int
    track_mm_rear: int

# This model is for responses and includes the 'id'
class VehicleSpec(VehicleSpecCreate):
    id: int

    class Config:
        orm_mode = True
