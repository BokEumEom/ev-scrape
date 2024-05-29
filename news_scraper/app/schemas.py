# app/schemas.py
from pydantic import BaseModel, Field, PositiveInt, PositiveFloat
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
        from_attributes = True

class NewsResponse(GenericModel, Generic[DataT]):
    items: List[DataT]
    total: int

# Vote
class VoteCreate(BaseModel):
    vote_value: int  # Can be 1 for upvote and -1 for downvote

    class Config:
        from_attributes = True  # To allow ORM models to be used with these schemas
        
# Community
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
        
# Vehicle
class VehicleSpecBase(BaseModel):
    manufacturer: str = Field(..., min_length=1, max_length=50, description="The manufacturer of the vehicle", example="Tesla")
    model: str = Field(..., min_length=1, max_length=50, description="The model of the vehicle", example="Model S")

class VehicleSpecCreate(VehicleSpecBase):
    drive_type: Optional[str] = Field(None, max_length=20, description="Type of drive system", example="AWD")
    battery_type: Optional[str] = Field(None, max_length=50, description="Type of battery used", example="Lithium-ion")
    battery_capacity: Optional[PositiveInt] = Field(None, description="Battery capacity in kWh", example=100)
    range_km: Optional[PositiveInt] = Field(None, description="Maximum range per charge in kilometers", example=500)
    acceleration: Optional[PositiveFloat] = Field(None, description="Time in seconds to accelerate from 0 to 100 km/h", example=2.5)
    weight_kg: Optional[PositiveInt] = Field(None, description="Total weight of the vehicle in kilograms", example=2000)
    storage_l: Optional[PositiveInt] = Field(None, description="Available storage space in liters", example=500)
    wheel_size: Optional[str] = Field(None, max_length=20, description="Diameter of the wheels in inches", example="21 inches")
    seating_capacity: Optional[PositiveInt] = Field(None, description="Number of seats in the vehicle", example=5)
    display_inch: Optional[PositiveFloat] = Field(None, description="Size of the in-car display screen in inches", example=11.2)
    minimum_ground_clearance_mm: Optional[PositiveInt] = Field(None, description="Minimum ground clearance in millimeters", example=145)
    width_mm: Optional[PositiveInt] = Field(None, description="Width of the vehicle in millimeters", example=1963)
    height_mm: Optional[PositiveInt] = Field(None, description="Height of the vehicle in millimeters", example=1445)
    length_mm: Optional[PositiveInt] = Field(None, description="Length of the vehicle in millimeters", example=4970)

    class Config:
        from_attributes = True

# This model is for responses and includes the 'id'
class VehicleSpec(VehicleSpecCreate):
    id: int

    class Config:
        from_attributes = True

# Users
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True