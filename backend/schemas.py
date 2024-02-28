from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    news_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class NewsItemBase(BaseModel):
    title: str
    link: str
    summary: str
    source: str

class NewsItemCreate(NewsItemBase):
    pass

class NewsItem(NewsItemBase):
    id: int
    pub_date: datetime
    comments: List[Comment] = []

    class Config:
        orm_mode = True
