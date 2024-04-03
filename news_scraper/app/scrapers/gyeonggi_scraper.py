# app/scrapers/gyeonggi_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
import re

class GyeonggiScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://ggeea.or.kr"
        self.path = "/energy/news?board_seq=0&currRow=1&select_list=all&srch_input=전기자동차"
        self.selectors = {
            'announcement': "tbody tr",
            'title': "td.board_left a",
            'date': "td:nth-of-type(3)",
            'link': "td.board_left a"
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title = item.select_one(self.selectors['title']).get_text(strip=True)
            date = item.select_one(self.selectors['date']).get_text(strip=True)
            link_element = item.select_one(self.selectors['link'])
            link = self.transform_gyeonggi_link(link_element)
            announcements.append({
                'title': title,
                'date': date,
                'link': link
            })
        return announcements

    def transform_gyeonggi_link(self, link_element):
        if link_element and 'href' in link_element.attrs:
            href_value = link_element['href']
            # Pattern to match the JavaScript function call and capture the board sequence number
            match = re.search(r"goBoardView\('(\d+)'\);", href_value)
            if match:
                board_seq = match.group(1)
                # Return the formatted URL using the captured board sequence number
                return f"{self.base_url}/energy/news/view?board_seq={board_seq}&currRow=1&select_list=all&srch_input=전기자동차"
        return 'No link'
