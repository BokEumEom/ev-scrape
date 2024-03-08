# app/scraper_gwangju.py
import asyncio
import aiofiles
from playwright.async_api import async_playwright
import json
import os
from hashlib import md5
import logging
from .announce_models import Announcement_Playwright

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

CACHE_FILE_PATH = 'gwangju_announcements_cache.json'

async def load_cached_data():
    if not os.path.exists(CACHE_FILE_PATH):
        return []
    try:
        async with aiofiles.open(CACHE_FILE_PATH, 'r', encoding='utf-8') as file:
            data = await file.read()
            return json.loads(data)
    except Exception as e:
        logger.error("Failed to load cached data", exc_info=True)
        return []

async def save_data_to_cache(data):
    try:
        async with aiofiles.open(CACHE_FILE_PATH, 'w', encoding='utf-8') as file:
            await file.write(json.dumps(data, ensure_ascii=False))
    except Exception as e:
        logger.error("Failed to save data to cache", exc_info=True)

def get_md5_hash(data):
    return md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()

async def scrape_gwangju_announcements():
    announcements = []
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto('https://www.gwangju.go.kr/contentsView.do?pageId=www791')

            # Wait for the iframe to load
            await page.wait_for_selector('iframe', timeout=10000)

            # Switch to the iframe
            iframe_element = await page.wait_for_selector('iframe')
            iframe = await iframe_element.content_frame()

            # Now that we are in the iframe, we can wait for the selector inside it
            await iframe.wait_for_selector('table tbody tr', timeout=10000)

            posts = await iframe.query_selector_all('table tbody tr')
            for post in posts:
                title_element = await post.query_selector('td.d_tb_left a')
                date_element = await post.query_selector('td.d_tb_center:nth-of-type(4)')
                
                 # Initialize variables
                title = None
                date = None
                link = None

                if title_element:
                    title = await title_element.inner_text()

                if date_element:
                    date = await date_element.inner_text()

                # Only create the announcement dict if both title and date are found
                if title and date:
                    onclick_value = await title_element.get_attribute('onclick')
                    code = onclick_value.split("'")[1] if onclick_value else 'No code found'
                    link = f"https://www.gwangju.go.kr/contentsView.do?pageId=www791&dataId={code}"

                    announcement = {
                        'title': title.strip(),
                        'date': date.strip(),
                        'link': link
                    }
                    announcements.append(announcement)
    except Exception as e:
        logger.error("Error during scraping: ", exc_info=True)
        return []
    finally:
        await browser.close()
    return announcements

async def main():
    logger.info("Main function started")
    cached_data = await load_cached_data()
    new_data = await scrape_gwangju_announcements()
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')
    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
