from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import crud
from typing import List
from app.models import SeoulAnnouncement, Announcement  # Assuming you've defined Pydantic schemas for your models
from backend.app.schemas.schemas import AnnouncementCreate
from backend.scrapers import scrape_seoul_announcements, scrape_incheon_announcements, scrape_kyungki_announcements, scrape_seoul_announcements, scraper_koroad_announcements

router = APIRouter()

# 서울시 사업공고 
@router.get("/api/v1/announce/seoul", response_model=List[SeoulAnnouncement])
async def get_seoul_announcements():
    try:
        announcements = await scrape_seoul_announcements()
        return announcements
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 인천시 고시공고
@router.get("/api/v1//announce/icn/", response_model=List[Announcement])
async def get_icn_announcements():
    try:
        announcements_data = scrape_incheon_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")
    
# 경기도 사업공고
@router.get("/api/v1//announce/kyki/", response_model=List[Announcement])
async def get_kyki_announcements():
    try:
        announcements_data = scrape_kyungki_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")

# 도로교통공단 사업공고
@router.get("/api/v1//announce/koroad/", response_model=List[Announcement])
async def get_koroad_announcements():
    try:
        announcements_data = scraper_koroad_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")