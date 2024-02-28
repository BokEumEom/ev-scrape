from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database.database import Base
from datetime import datetime

class NewsItem(Base):
    __tablename__ = "news_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    summary = Column(Text)
    link = Column(String)
    published_date = Column(DateTime, default=datetime.utcnow)
    source = Column(String)

