import asyncio
import aiofiles
from playwright.async_api import async_playwright
import json
import os
from hashlib import md5
import logging
from models import SeoulAnnouncement
import urllib.parse

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

CACHE_FILE_PATH = 'seoul_announcements_cache.json'

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

async def scrape_seoul_announcements():
    announcements = []
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)  # headless 모드 활성화
            page = await browser.new_page()
            search_term = urllib.parse.quote('전기차')
            base_url = 'https://www.seoul.go.kr/news/news_notice.do'
            search_url = f'{base_url}?#list/1/cntPerPage=10&srchText={search_term}'  # URL 구조 확인 필요
            await page.goto(search_url, wait_until="networkidle")  # 네트워크 활동이 최소화될 때까지 대기

            # 필요한 경우 요소가 로드될 때까지 대기
            await page.wait_for_selector(".sib-lst-type-basic-subject a", timeout=5000)  # 예시, 선택자 확인 필요

            posts = await page.query_selector_all("//td[contains(@class,'sib-lst-type-basic-subject')]/..")  # XPath 선택자 검증
            for post in posts:
                title_element = await post.query_selector('.sib-lst-type-basic-subject a')
                date_element = await post.query_selector("td:nth-of-type(5)")
                code_element = await post.query_selector('a[data-code]')  # 'data-code' 속성을 가진 'a' 태그를 명확히 지정

                if title_element:
                    title = await title_element.inner_text()
                date = await date_element.inner_text() if date_element else 'No date found'
                code = await code_element.get_attribute('data-code') if code_element else 'No code found'

                link = f"{base_url}#view/{code}" if code else '#'
                announcement = {
                    'title': title,
                    'date': date,
                    'link': link
                }
                announcements.append(announcement)
    except Exception as e:
        logger.error("Error during scraping: ", exc_info=True)
    return announcements

async def main():
    logger.info("Main function started")
    cached_data = await load_cached_data()
    new_data = await scrape_seoul_announcements()
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')
    for announcement in new_data:
        print(announcement)

if __name__ == "__main__":
    asyncio.run(main())
