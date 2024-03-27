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

CACHE_FILE_PATH = 'gn_announcements_cache.json'

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

async def scrape_gn_announcements():
    announcements = []
    browser = None
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto('https://www.gn.go.kr/www/selectGosiNttList.do?key=263&searchGosiSe=01,04,06')

            # Extract posts from the table
            rows = await page.query_selector_all('table.bbs_default.list tr')
            for row in rows[1:]:  # Skip the header row
                title_cell = await row.query_selector('td.subject a')
                date_cell = await row.query_selector('td:last-child')

                if title_cell and date_cell:
                    title = (await title_cell.inner_text()).strip()
                    date = (await date_cell.inner_text()).strip()
                    href = await title_cell.get_attribute('href')

                    if href:
                        # Assuming href contains the gosiNttNo parameter directly
                        gosiNttNo = href.split('gosiNttNo=')[1]
                        link = f"https://www.gn.go.kr/www/selectGosiNttView.do?pageUnit=10&pageIndex=1&searchCnd=all&key=263&searchGosiSe=01,04,06&gosiNttNo={gosiNttNo}"
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
    new_data = await scrape_gn_announcements()
    
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
