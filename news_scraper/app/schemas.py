from pydantic import BaseModel
from datetime import datetime

class NewsBase(BaseModel):
    title: str
    source: str
    link: str

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    published_at: datetime

    class Config:
        from_attributes = True
