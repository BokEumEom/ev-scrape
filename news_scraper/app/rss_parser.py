import feedparser

def parse_rss_feed(url: str):
    """
    RSS 피드 URL을 받아 파싱하고, 각 뉴스 항목의 제목, 링크, 발행 날짜 등을 반환합니다.
    """
    feed = feedparser.parse(url)
    news_items = []

    for entry in feed.entries:
        news_items.append({
            'title': entry.title,
            'link': entry.link,
            'published_at': entry.published_parsed,  # datetime 구조로 변환할 필요가 있을 수 있습니다.
            'source': entry.get('source', {}).get('title', url)  # source가 없는 경우 URL을 사용
        })
    
    return news_items
