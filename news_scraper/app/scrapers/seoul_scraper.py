# app/scrapers/seoul_scraper.py
import asyncio
import logging
import urllib.parse
from playwright.async_api import async_playwright
from .base_playwright_scraper import BasePlaywrightScraper
from ..utils.cache_management import load_cached_data, save_data_to_cache, get_md5_hash

# Setup logging
logger = logging.getLogger('SeoulScraper')

class SeoulScraper(BasePlaywrightScraper):
    def __init__(self):
        search_term = urllib.parse.quote("전기차")
        super().__init__("https://www.seoul.go.kr", f"/news/news_notice.do?#list/1/cntPerPage=10&srchText={search_term}")

    async def scrape(self):
        announcements = []
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto(f"{self.base_url}{self.path}", wait_until="networkidle")

                # Ensure the correct selectors based on the structure of the page
                posts = await page.query_selector_all("//td[contains(@class,'sib-lst-type-basic-subject')]/..")
                for post in posts:
                    title_element = await post.query_selector('.sib-lst-type-basic-subject a')
                    date_element = await post.query_selector("td:nth-of-type(5)")  # Update this selector as needed
                    code_element = await post.query_selector('a[data-code]')  # Assuming 'a' tag contains a 'data-code' attribute

                    title = await title_element.inner_text() if title_element else 'No title found'
                    date = await date_element.inner_text() if date_element else 'No date found'
                    code = await code_element.get_attribute('data-code') if code_element else 'No code found'

                    link = f"{self.base_url}/news/news_notice.do#view/{code}" if code else 'No link found'

                    if title and date and link:
                        announcements.append({
                            'title': title,
                            'date': date,
                            'link': link
                        })

                await browser.close()
        except Exception as e:
            logger.error(f"Error during scraping: {e}", exc_info=True)
        
        return announcements

async def main():
    scraper = SeoulScraper()
    cache_key = "seoul_announcements_cache.json"
    cached_data = await load_cached_data(cache_key)
    new_data = await scraper.scrape()

    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(cache_key, new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        logger.info(f"Title: {announcement['title']}, Date: {announcement['date']}, Link: {announcement['link']}")

if __name__ == "__main__":
    asyncio.run(main())
