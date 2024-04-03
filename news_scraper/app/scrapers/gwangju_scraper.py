# app/scrapers/gwangju_scraper.py
import asyncio
from playwright.async_api import async_playwright
from .base_playwright_scraper import BasePlaywrightScraper
import logging
import re
from ..utils.cache_management import load_cached_data, save_data_to_cache, get_md5_hash

# Setup logging for the Gwangju scraper
logger = logging.getLogger('GwangjuScraper')
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class GwangjuScraper(BasePlaywrightScraper):
    def __init__(self):
        super().__init__("https://www.gwangju.go.kr", "/contentsView.do?pageId=www791")
        self.page_id = "www791"

    async def scrape(self):
        announcements = []
        seen_titles = set()  # Set to store titles and avoid duplicates
        url = f"{self.base_url}/contentsView.do?pageId={self.page_id}"
        logger.info(f"Navigating to {url}")

        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto(url, wait_until="networkidle")

                await page.wait_for_selector('iframe', timeout=10000)
                iframe_element = await page.wait_for_selector('iframe')
                iframe = await iframe_element.content_frame()
                await iframe.wait_for_selector('table tbody tr', timeout=10000)

                rows = await iframe.query_selector_all('table tbody tr')
                for row in rows:
                    title_element = await row.query_selector('td.d_tb_left a')
                    date_element = await row.query_selector('td.d_tb_center')

                    title = (await title_element.inner_text()).strip() if title_element else None
                    date = (await date_element.inner_text()).strip() if date_element else None

                    # Continue only if the title is found and it's not already seen
                    if title and title not in seen_titles:
                        seen_titles.add(title)  # Add the title to the set of seen titles
                        onclick_attr = await title_element.get_attribute('onclick')
                        data_id_match = re.search(r"viewData\('(\d+)','A'", onclick_attr)
                        data_id = data_id_match.group(1) if data_id_match else None

                        if data_id:
                            link = f"{self.base_url}/contentsView.do?pageId={self.page_id}&dataId={data_id}"
                            announcements.append({'title': title, 'date': date, 'link': link})

        except Exception as e:
            logger.error(f"Error during scraping: {e}")
        finally:
            if browser:
                await browser.close()

        return announcements

# This is just a placeholder for your existing main function and cache logic
async def main():
    scraper = GwangjuScraper()
    cached_data = await load_cached_data("gwangju_announcements_cache.json")
    new_data = await scraper.scrape()

    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache("gwangju_announcements_cache.json", new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        logger.info(f"Title: {announcement['title']}, Date: {announcement['date']}, Link: {announcement['link']}")

if __name__ == "__main__":
    asyncio.run(main())
