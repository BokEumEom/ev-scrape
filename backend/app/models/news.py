# app/models/news.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime
from app.db.database import Base

class News(Base):
    __tablename__ = 'google_news'

    # Primary key as an auto-incrementing integer
    id = Column(Integer, primary_key=True, index=True)
    # News title
    title = Column(String, nullable=False)
    # News Source
    source = Column(String, nullable=False)
    # Link to the news article
    link = Column(String, nullable=False)
    # The publication date of the news article
    publication_date = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        # String representation of the News model
        return f"<News title='{self.title}', source='{self.source}', publication_date='{self.publication_date}'>"
