# app/scraper_goyang.py
import asyncio
import aiofiles
from playwright.async_api import async_playwright
import json
import os
from hashlib import md5
import logging

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

CACHE_FILE_PATH = 'goyang_announcements_cache.json'

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
    except IOError as e:
        logger.error(f"IOError while trying to write cache file: {e}")
    except json.JSONDecodeError as e:
        logger.error(f"JSON encoding error while writing cache file: {e}")
    except Exception as e:
        logger.error("Unexpected error while saving data to cache", exc_info=True)


def get_md5_hash(data):
    return md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()

async def scrape_goyang_announcements():
    announcements = []
    browser = None
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto('https://www.goyang.go.kr/www/link/BD_notice.do')

            # Wait for the iframe to load and switch to it
            iframe_element = await page.wait_for_selector('iframe', timeout=30000)
            iframe = await iframe_element.content_frame()
            await iframe.wait_for_selector('table.table-list', timeout=30000)

            # Extract posts from the table
            rows = await iframe.query_selector_all('table.table-list > tbody > tr')
            for row in rows:
                title_cell = await row.query_selector('td:nth-of-type(3) a')
                date_cell = await row.query_selector('td:nth-of-type(5)')

                if title_cell and date_cell:
                    # Check if this is a row with actual data, not a pagination or header row
                    title_text = await title_cell.inner_text()
                    if title_text:
                        title = title_text.strip()
                        date = (await date_cell.inner_text()).strip()
                        
                        # Extract the 'dataId' from the 'onclick' attribute of the anchor tag
                        onclick_value = await title_cell.get_attribute('onclick')
                        if onclick_value and "searchDetail" in onclick_value:
                            data_id = onclick_value.split("'")[1]
                            link = f"https://www.goyang.go.kr/contentsView.do?pageId=www791&dataId={data_id}"
                        else:
                            link = 'No link found'

                        announcement = {
                            'title': title,
                            'date': date,
                            'link': link
                        }
                        announcements.append(announcement)
    except Exception as e:
        logger.error("Error during scraping: ", exc_info=True)
    finally:
        if browser:
            await browser.close()
    return announcements

async def main():
    logger.info("Main function started")
    cached_data = await load_cached_data()
    new_data = await scrape_goyang_announcements()
    
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
