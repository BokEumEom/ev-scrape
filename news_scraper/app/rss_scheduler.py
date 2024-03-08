# app/rss_scheduler.py
import asyncio
import os
from dotenv import load_dotenv
from .database import SessionLocal
from .crud import create_news
from .config import get_logger
from .rss_parser import parse_rss_feed

load_dotenv()  # 환경 변수 로드

# 환경 변수에서 스케줄링 간격 읽기 (기본값: 86400초, 즉 24시간)
rss_fetch_interval = int(os.getenv('RSS_FETCH_INTERVAL_SECONDS', 86400))

logger = get_logger()

async def fetch_and_store_rss_feed():
    async with SessionLocal() as session:
        rss_url = "https://news.google.com/rss/search?q=전기차&hl=ko&gl=KR&ceid=KR:ko"
        news_items = await parse_rss_feed(rss_url)
        for item in news_items:
            await create_news(session, item)
        logger.info("RSS feed fetched and stored")

async def start_rss_feed_scheduler():
    while True:
        try:
            logger.info("RSS feed scheduler started")
            await fetch_and_store_rss_feed()

            logger.info(f"Next RSS feed fetch scheduled after {rss_fetch_interval} seconds")
            await asyncio.sleep(rss_fetch_interval)
        except asyncio.CancelledError:
            logger.info("RSS feed scheduler cancelled")
            break
        except Exception as e:
            logger.error(f"An unexpected error occurred in RSS feed scheduler: {e}")
            await asyncio.sleep(60)  # 1분 후 재시도

# 이 스크립트가 메인으로 실행될 때만 스케줄러 시작
if __name__ == "__main__":
    asyncio.run(start_rss_feed_scheduler())


