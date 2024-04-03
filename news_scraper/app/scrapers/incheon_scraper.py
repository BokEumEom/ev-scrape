# app/scrapers/incheon_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from app.config import get_logger

logger = get_logger()

class IncheonScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.incheon.go.kr"
        self.path = "/IC010205?beginDt=&endDt=&srchMainManagerDeptNm=&srchRepTitle=전기차"
        self.selectors = {
            'announcement': "li",
            'title': "strong.subject",
            'date': "dd",
            'link': "a"
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')     
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link_element = item.select_one(self.selectors['link'])
            
            if title_element and date_element and link_element:
                title = title_element.text.strip() if title_element else 'No title'
                date = date_element.text.strip() if date_element else 'No date'
                link = link_element['href'] if link_element else '#'
                announcements.append({
                    'title': title,
                    'date': date,
                    'link': link if link.startswith('http') else f"{self.base_url}{link}"
                })
            else:
                # 요소 중 하나라도 없는 경우의 처리 로직 (예: 로깅)
                logger.warning("Missing one or more elements in announcement item.")
        
        return announcements
