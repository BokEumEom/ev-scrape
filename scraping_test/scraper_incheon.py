# app/scraper_incheon.py
import asyncio
import aiofiles
import json
import os
from hashlib import md5
from playwright.async_api import async_playwright
import logging
import re

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

INCEHON_ANNOUNCEMENTS_URL = "https://announce.incheon.go.kr/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchList&flag=gosiGL&svp=Y&sido=ic"
CACHE_FILE_PATH = 'incheon_announcements_cache.json'

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

async def scrape_incheon2_announcements():
    announcements = []
    browser = None
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(INCEHON_ANNOUNCEMENTS_URL, wait_until="domcontentloaded")
            await page.wait_for_selector("table[summary] tr")

            rows = await page.query_selector_all("table[summary] tr")
            for row in rows:
                title_cell = await row.query_selector('td.d_tb_left a')
                date_cell = await row.query_selector('td.d_tb_center:nth-of-type(4)')
                
                if title_cell and date_cell:
                    title = await title_cell.inner_text()
                    date = await date_cell.inner_text()
                    onclick_value = await title_cell.get_attribute('onclick')
                    match = re.search(r"viewData\('(\d+)',", onclick_value or '')
                    link = "Link not found"
                    if match:
                        announcement_id = match.group(1)
                        link = f"https://announce.incheon.go.kr/citynet/jsp/sap/SAPGosiBizProcess.do?command=searchDetail&flag=gosiGL&svp=Y&sido=ic&sno={announcement_id}&gosiGbn=A"
                    
                    announcements.append({
                        'title': title.strip(),
                        'date': date.strip(),
                        'link': link
                    })
    except Exception as e:
        logger.error("Error during scraping: ", exc_info=True)
        return []
    finally:
        if browser:
            await browser.close()
    return announcements

async def main():
    logger.info("Main function started")
    cached_data = await load_cached_data()
    new_data = await scrape_incheon2_announcements()
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')
    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
