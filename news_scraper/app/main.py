# app/main.py
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Query, Path, Body, Request
from app.api.v1.endpoints import news, community, vehicle, users, ev_registration
from contextlib import asynccontextmanager
import asyncio
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from .database import Base, engine  
from .rss_scheduler import start_rss_feed_scheduler
from .config import get_logger
from fastapi.middleware.cors import CORSMiddleware
from .announce_models import Announcement
from .scrapers.seoul_scraper import SeoulScraper
from .scrapers.incheon_scraper import IncheonScraper
from .scrapers.gyeonggi_scraper import GyeonggiScraper
from .scrapers.koroad_scraper import KoroadScraper
from .scrapers.bucheon_scraper import BucheonScraper
from .scrapers.ulsan_scraper import UlsanScraper
from .scrapers.sejong_scraper import SejongScraper
from .scrapers.wonju_scraper import WonjuScraper
from .scrapers.goyang_scraper import GoyangScraper
from .scrapers.gwangju_scraper import GwangjuScraper
from .scrapers.incheon2_scraper import Incheon2Scraper
from .scrapers.notice_scraper import EVPortalNoticeScraper

SCRAPERS = {
    'gyeonggi': GyeonggiScraper().scrape,
    'incheon': IncheonScraper().scrape,
    'koroad': KoroadScraper().scrape,
    'bucheon': BucheonScraper().scrape,
    'ulsan': UlsanScraper().scrape,
    'sejong': SejongScraper().scrape,
    'wonju': WonjuScraper().scrape,
    'goyang': GoyangScraper().scrape,
    'seoul': SeoulScraper().scrape,
    'gwangju': GwangjuScraper().scrape,
    'incheon2': Incheon2Scraper().scrape,
    'evportal': EVPortalNoticeScraper().scrape
    # 기타 지역 스크래퍼 추가...
}

logger = get_logger()

@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # Create database tables asynchronously
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Log that the application has started
    logger.info("Application started")

    # Start the RSS feed scheduler in the background
    task = asyncio.create_task(start_rss_feed_scheduler())

    yield

    # Attempt to cancel the task on cleanup
    task.cancel()

    # Log that the application has stopped
    logger.info("Application stopped")

app = FastAPI(lifespan=app_lifespan)

app.include_router(news.router, prefix="/api/v1/news", tags=["News"])
app.include_router(community.router, prefix="/api/v1/community", tags=["Community"])
app.include_router(vehicle.router, prefix="/api/v1/vehicles", tags=["Vehicles"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(ev_registration.router, prefix="/api/v1/ev-registration", tags=["EV Registration"])

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, specify your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/announcements/regions", response_model=List[str])
async def list_regions():
    return list(SCRAPERS.keys())

@app.get("/api/v1/announcements/{region_name}", response_model=List[Announcement])
async def get_regional_announcements(region_name: str = Path(..., description="The name of the region")):
    scraper = SCRAPERS.get(region_name)
    if scraper is None:
        raise HTTPException(status_code=404, detail="Region not found")
    
    try:
        if callable(scraper):
            data = await scraper()  # 함수 호출
        else:
            data = await scraper.scrape()  # 클래스 인스턴스의 비동기 메소드 호출
        return data
    except Exception as e:
        logger.error(f"An error occurred while fetching announcements: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail}
    )

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.error(f"Database error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Database error"}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc}")
    return JSONResponse(
        status_code=422,
        content={"success": False, "message": "Validation failed", "errors": exc.errors()}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An unexpected error occurred"}
    )
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)