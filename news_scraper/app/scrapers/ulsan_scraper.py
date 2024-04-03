# app/scrapers/ulsan_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper

class UlsanScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.ulsan.go.kr"
        self.path = "/u/rep/transfer/notice/list.ulsan?mId=001004002000000000"
        self.selectors = {
            'announcement': "tr",
            'title': "td.gosi > a",
            'date': "td:nth-last-child(1)",
            'link': "td.gosi > a"  # 링크를 찾기 위해 셀렉터 업데이트
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link_element = item.select_one(self.selectors['link'])
            
            # Check if the title or link element exists and if it has the expected 'href' attribute
            if not title_element or not link_element or not link_element.has_attr('href'):
                continue  # Skip the rest of the loop and proceed with the next iteration

            title = title_element.text.strip() if title_element else 'No title'
            date = date_element.text.strip() if date_element else 'No date'
            # 링크 요소가 없을 때 "No link"로 표시되도록 수정
            link = self.transform_link(link_element['href']) if link_element else 'No link'

            announcements.append({
                'title': title,
                'date': date,
                'link': link
            })

        return announcements

    def transform_link(self, href):
        # URL에서 문서 ID를 추출하고, 올바른 형식으로 링크를 구성합니다.
        doc_id = href.split('/')[-1].split('.')[0]
        # 올바른 전체 URL을 구성합니다.
        full_url = f"{self.base_url}/u/rep/transfer/notice/{doc_id}.ulsan?mId=001004002000000000&gosiGbn=A"
        
        return full_url

# Example use in main.py:
# scrapers['ulsan'] = UlsanScraper().scrape
