from fastapi import APIRouter, HTTPException
from ..services.news_service import get_news

router = APIRouter()

@router.get("/news")
async def read_news(keywords: str, page: int = 1, limit: int = 10):
    """
    API endpoint to fetch news based on keywords, with pagination.
    """
    keywords_list = keywords.split(",")  # Assuming keywords are comma-separated
    try:
        news_items = await get_news(keywords_list, page, limit)
        return news_items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
