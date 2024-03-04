# comments_router.py
from fastapi import APIRouter, HTTPException, Body
from typing import List, Optional, Dict
from pydantic import BaseModel

class Comment(BaseModel):  # This should be replaced with actual Pydantic models or SQLAlchemy models as needed
    id: Optional[int] = None
    news_id: str
    content: str

router = APIRouter()

comments_db: List[Dict[str, Optional[int]]] = []  # This simulates an in-memory database

@router.post("/api/v1/comments/", response_model=Comment)
async def add_comment(comment: Comment) -> Comment:
    comment.id = len(comments_db) + 1  # Simple ID assignment, replace with your DB logic
    comments_db.append(comment.dict())
    return comment

@router.get("/api/v1/comments/{news_id}", response_model=List[Comment])
async def get_comments(news_id: str) -> List[Comment]:
    return [comment for comment in comments_db if comment['news_id'] == news_id]
