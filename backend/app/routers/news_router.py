# /backend/app/routers/news_router.py
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.db.crud import crud
from app.db.crud import get_news, get_news_count
from app.db.session import get_db

router = APIRouter()

@router.get("/news/")
async def get_api_news(db: Session = Depends(get_db), page: int = Query(1, ge=1), limit: int = Query(10, ge=1)) -> Dict[str, Any]:
    try:
        db_news = crud.get_news(db, skip=(page-1)*limit, limit=limit)
        news_list = sorted(db_news, key=lambda x: x.publication_date, reverse=True)
        start_index = (page-1) * limit
        end_index = start_index + limit
        paginated_news_list = news_list[start_index:end_index]
        nextPageAvailable = len(paginated_news_list) == limit
        return {"news": paginated_news_list, "nextPageAvailable": nextPageAvailable}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
