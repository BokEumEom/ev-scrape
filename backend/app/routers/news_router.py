# news_router.py
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.db import crud
from app.schemas.schemas import News
from app.db.session import get_db

router = APIRouter()

@router.get("/news/")
async def get_api_news(db: Session = Depends(get_db), page: int = Query(1, ge=1), limit: int = Query(10, ge=1)) -> Dict[str, Any]:
    try:
        db_news = crud.get_news(db, skip=(page-1)*limit, limit=limit)
        news_list = [item for item in db_news]
        nextPageAvailable = len(news_list) == limit
        return {"news": news_list, "nextPageAvailable": nextPageAvailable}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Additional routes for announcements can be added here, similar to the structure above.
