# app/scrapers/incheon2_scraper.py
from .base_playwright_scraper import BasePlaywrightScraper
from ..utils.cache_management import load_cached_data, save_data_to_cache, get_md5_hash
import logging
import re
import asyncio
from bs4 import BeautifulSoup

logger = logging.getLogger('Incheon2Scraper')

class Incheon2Scraper(BasePlaywrightScraper):
    def __init__(self):
        # Initialize the base class with the specific URL and path for Incheon announcements.
        super().__init__("https://announce.incheon.go.kr", "/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchList&flag=gosiGL&svp=Y&sido=ic")

    async def scrape(self):
        # Use the fetch_page method from BasePlaywrightScraper to get the page content.
        page_content = await self.fetch_page()
        # Since page_content is a raw HTML string, we may need BeautifulSoup here if required.
        # For demonstration, assume page_content processing as if it was directly obtained.
        
        announcements = []
        # Directly using BeautifulSoup or other parsing logic here to process page_content
        # Assuming BeautifulSoup is used to parse the fetched HTML content
        soup = BeautifulSoup(page_content, 'html.parser')
        rows = soup.select("table[summary] tr")
        for row in rows:
            title_cell = row.select_one('td.d_tb_left a')
            date_cell = row.select_one('td.d_tb_center:nth-of-type(4)')

            title = title_cell.text.strip() if title_cell else None
            date = date_cell.text.strip() if date_cell else None
            onclick_value = title_cell.get('onclick', '') if title_cell else ''
            announcement_id_match = re.search(r"viewData\('(\d+)',", onclick_value)
            announcement_id = announcement_id_match.group(1) if announcement_id_match else None

            if announcement_id:
                link = f"{self.base_url}/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchDetail&flag=gosiGL&svp=Y&sido=ic&sno={announcement_id}&gosiGbn=A"
            else:
                link = None

            if title and date and link:
                announcements.append({
                    'title': title,
                    'date': date,
                    'link': link
                })

        return announcements

# Ensure to adjust the main function and caching logic accordingly
async def main():
    scraper = Incheon2Scraper()
    cache_key = "incheon_announcements_cache.json"
    cached_data = await load_cached_data(cache_key)
    new_data = await scraper.scrape()
    # Proceed with caching logic as before

if __name__ == "__main__":
    asyncio.run(main())
