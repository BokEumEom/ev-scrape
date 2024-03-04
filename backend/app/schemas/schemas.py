# /app/schemas/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NewsBase(BaseModel):
    title: str
    link: str
    source: Optional[str] = None
    publication_date: Optional[datetime] = None

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int

    class Config:
        from_attributes = True  # Updated from 'orm_mode' to 'from_attributes'