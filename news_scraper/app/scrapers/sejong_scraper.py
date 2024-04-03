# app/scrapers/sejong_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper

class SejongScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.sejong.go.kr"
        self.path = "/prog/publicNotice/kor/sub02_030301/C1_1/list.do"
        self.selectors = {
            'announcement': "tr",  # 각 공고가 있는 테이블 행의 셀렉터
            'title': "td.text-left > a",  # 공고 제목 셀렉터
            'date': "td:nth-last-child(1)",  # 공고 날짜 셀렉터, assuming the date is the last td element
            'link': "td.text-left > a"  # 링크 셀렉터
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link_element = title_element  # The link is on the same element as the title

            if title_element and link_element:
                title = title_element.text.strip()
                href = link_element.get('href')
                link = self.base_url + href if href else 'No link'
                date = date_element.text.strip() if date_element else 'No date'

                announcements.append({
                    'title': title,
                    'date': date,
                    'link': link
                })

        return announcements
