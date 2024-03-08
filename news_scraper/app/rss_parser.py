# app/rss_parser.py
import feedparser
from datetime import datetime
import time
from .schemas import NewsCreate

async def parse_rss_feed(url: str):
    """
    RSS 피드 URL을 받아 파싱하고, 각 뉴스 항목의 제목, 링크, 발행 날짜 등을 반환합니다.
    비동기 함수로 선언되어 있지만, feedparser가 동기 라이브러리이므로, 실제 비동기 작업이 아님에 주의하세요.
    """
    feed = feedparser.parse(url)
    news_items = []

    for entry in feed.entries:
        # struct_time을 datetime 객체로 변환
        published_at = datetime.fromtimestamp(time.mktime(entry.published_parsed))
        news_items.append(NewsCreate(
            title=entry.title,
            link=entry.link,
            published_at=published_at,
            source=entry.get('source', {}).get('title', url)  # source가 없는 경우 URL을 사용
        ))
    
    return news_items

