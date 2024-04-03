# app/scrapers/koroad_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin

class KoroadScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.koroad.or.kr"
        self.path = "/main/bid/bid_etc_list.do"
        self.selectors = {
            'announcement': "tr",
            'title': "td.tit.left > div.link > a",
            'date': "td.date > span",
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link_element = item.select_one('a')
            
            # Check if the title or link element exists and if it has the expected 'href' attribute
            if not title_element or not link_element or not link_element.has_attr('href'):
                continue  # Skip the rest of the loop and proceed with the next iteration

            title = title_element.text.strip() if title_element else 'No title'
            date = date_element.text.strip() if date_element else 'No date'
            link = urljoin(self.base_url, f"/main/bid/{link_element['href']}") if link_element else 'No link'

            announcements.append({
                'title': title,
                'date': date,
                'link': link
            })

        return announcements

# Example use in main.py:
# scrapers['koroad'] = KoroadScraper().scrape
