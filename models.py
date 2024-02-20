# models.py
from pydantic import BaseModel, UUID4
from typing import Optional

# Define the Comment model using Pydantic for data validation
class Comment(BaseModel):
    id: Optional[int] = None
    news_id: UUID4
    content: str
    upvotes: int = 0
    downvotes: int = 0

# 전기차 충전사업 공고 모델 정의   
class Announcement(BaseModel):
    title: str
    link: str
    date: str
    
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

# 투표 모델 정의    
class Vote(BaseModel):
    vote_type: str  # 'upvote' 또는 'downvote'
    
# 댓글 추천 모델 정의    
class CommentVote(BaseModel):
    comment_id: int
    vote_type: str
