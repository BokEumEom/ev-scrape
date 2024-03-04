# app/models/announcement.py
from sqlalchemy import Column, Integer, String, Date
from app.db.database import Base

class Announcement(Base):
    __tablename__ = "announcements"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    link = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    
# 서울시 전기차 충전사업 공고 모델 정의 
class SeoulAnnouncement:
    def __init__(self, title, date, link):
        self.title = title
        self.date = date
        self.link = link

    def dict(self):
        return {
            'title': self.title,
            'date': self.date,
            'link': self.link
        }