# app/rss_scheduler.py
import asyncio
from datetime import datetime, timedelta
from .rss_parser import parse_rss_feed
from .crud import create_news
from .database import SessionLocal
from .config import get_logger

logger = get_logger()

async def fetch_and_store_rss_feed():
    async with SessionLocal() as session:
        rss_url = "https://news.google.com/rss/search?q=전기차&hl=ko&gl=KR&ceid=KR:ko"
        news_items = await parse_rss_feed(rss_url)
        for item in news_items:
            await create_news(session, item)
        await session.commit()
        logger.info("RSS feed fetched and stored")

async def start_rss_feed_scheduler():
    while True:
        now = datetime.now()
        next_run = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
        wait_seconds = (next_run - now).total_seconds()
        logger.info(f"Next RSS feed fetch scheduled in {wait_seconds} seconds")
        await asyncio.sleep(wait_seconds)
        await fetch_and_store_rss_feed()
