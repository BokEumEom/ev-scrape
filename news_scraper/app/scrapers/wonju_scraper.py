# app/scrapers/wonju_scraper.py
from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
from urllib.parse import urljoin

class WonjuScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.wonju.go.kr"
        self.path = "/www/selectBbsNttList.do?bbsNo=140&key=216"
        self.selectors = {
            'announcement': "tbody.text_center > tr",
            'title': "td.p-subject > a",
            'date': "td:nth-of-type(4)",
            'link': "td.p-subject > a"
        }

    async def scrape_specific(self, html: str):
        soup = BeautifulSoup(html, 'html.parser')
        announcements = []
        for item in soup.select(self.selectors['announcement']):
            title_element = item.select_one(self.selectors['title'])
            date_element = item.select_one(self.selectors['date'])
            link_element = item.select_one(self.selectors['link'])

            title = title_element.text.strip() if title_element else 'No title'
            date = date_element.text.strip() if date_element else 'No date'
            link = self.transform_link(link_element['href']) if link_element else 'No link'

            announcements.append({
                'title': title,
                'date': date,
                'link': link
            })

        return announcements

    def transform_link(self, href):
        # Make sure that '/www' is included in the path and remove any periods after '/www'
        if href.startswith('/'):
            href = '/www' + href if not href.startswith('/www') else href
        else:
            href = '/www/' + href
        href = href.replace('/www./', '/www/')
        # Join the adjusted path with the base URL
        return urljoin(self.base_url, href)


# Rest of the module code (if any)...



