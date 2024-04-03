# app/scrapers/bucheon_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urlencode, parse_qsl, urlparse

class BucheonScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "http://www.bucheon.go.kr"
        self.path = "/site/program/board/basicboard/list?boardtypeid=26736&menuid=148002001001"
        self.selectors = {
            'announcement': "tr",
            'title': "td.td-lf > a",
            'date': "td:nth-of-type(4)",
            'link': "a"
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

            title = title_element.text.strip()
            date = date_element.text.strip() if date_element else 'No date'
            link = self.transform_link(link_element['href'])

            announcements.append({
                'title': title,
                'date': date,
                'link': link
            })

        return announcements

    def transform_link(self, href):
        # Parse the query string into a dictionary
        query_params = dict(parse_qsl(urlparse(href).query))

        # Construct the full URL for the announcement
        full_url = f"http://www.bucheon.go.kr/site/program/board/basicboard/view?" + urlencode(query_params)

        return full_url