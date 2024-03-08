# announce_models.py
from pydantic import BaseModel
from typing import Optional

# 전기차 충전사업 공고 모델 정의   
class Announcement(BaseModel):
    title: str
    link: str
    date: str
    
# 서울시 전기차 충전사업 공고 모델 정의 
class Announcement_Playwright:
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