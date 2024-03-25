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

async def scrape_gjcity_announcements():
    announcements = []
    browser = None
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto('https://www.gjcity.go.kr/portal/saeol/gosi/list.do?mId=0202010000')

            # Wait for the selector that contains the announcements table
            await page.wait_for_selector('table.bod_list taC gosi', timeout=30000)

            rows = await page.query_selector_all('table.bod_list taC gosi > tbody > tr')
            for row in rows:
                number_cell = await row.query_selector('td.list_num')
                title_cell = await row.query_selector('td.taL list_tit > a')
                dept_cell = await row.query_selector('td.list_dept')
                date_cell = await row.query_selector('td.list_date')

                number = await number_cell.inner_text() if number_cell else None
                title = await title_cell.inner_text() if title_cell else None
                dept = await dept_cell.inner_text() if dept_cell else None
                date = await date_cell.inner_text() if date_cell else None
                href = await title_cell.get_attribute('href') if title_cell else None

                # Constructing full link if href is relative
                link = f"https://www.gjcity.go.kr{href}" if href and href.startswith('/') else href

                if title and date:
                    announcements.append({
                        'number': number.strip(),
                        'title': title.strip(),
                        'department': dept.strip() if dept else "No Department",
                        'date': date.strip(),
                        'link': link
                    })
    except Exception as e:
        # Log the error or print it. Replace with appropriate logger if available
        print(f"Error during scraping: {e}")
    finally:
        if browser:
            await browser.close()
    return announcements

# To run the function:
# asyncio.run(scrape_anyang_announcements())

async def main():
    logger.info("Main function started")
    cached_data = await load_cached_data()
    new_data = await scrape_gjcity_announcements()
    
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
