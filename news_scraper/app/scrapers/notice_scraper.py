# app/scrapers/notice_scraper.py
import asyncio
import logging
from playwright.async_api import async_playwright
from .base_playwright_scraper import BasePlaywrightScraper
from ..utils.cache_management import load_cached_data, save_data_to_cache, get_md5_hash

# Setup logging
logger = logging.getLogger('EVPortalNoticeScraper')
logging.basicConfig(level=logging.INFO)

class EVPortalNoticeScraper(BasePlaywrightScraper):
    def __init__(self):
        base_url = "https://ev.or.kr/nportal/partcptn/initNoticeAction.do"
        super().__init__(base_url, "")

    async def scrape(self):
        announcements = []
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto(f"{self.base_url}{self.path}", wait_until="networkidle")
                logger.info("Page loaded")

                # Adjusted to query for each 'li' under 'ul' in 'div.board_thumb'
                posts = await page.query_selector_all('div.board_thumb > ul > li')
                logger.info(f"Found {len(posts)} posts")

                for post in posts:
                    # Adjusted selectors based on the new structure provided
                    title_element = await post.query_selector('div.board_title > p')
                    date_element = await post.query_selector('li.date')
                    views_element = await post.query_selector('li.views')
                    link_element = await post.query_selector('a')  # Assuming 'a' is still correctly selected

                    title = await title_element.inner_text() if title_element else 'No title'
                    date = await date_element.inner_text() if date_element else 'No date'
                    views = await views_element.inner_text() if views_element else 'No views'
                    # link = await link_element.get_attribute('href') if link_element else 'No link'
                    
                    artc_id = await link_element.get_attribute('onclick')
                    artc_id = artc_id.split("'")[3] if artc_id else 'No ID'  # Extracting ARTC_ID from the onclick attribute

                    link = f"https://ev.or.kr/nportal/infoGarden/selectBBSListDtl.do?title=공지사항&ARTC_ID={artc_id}&BLBD_ID=notice&replyYn=N&TITNM=참여마당&srecordCountPerPage=5&spageNo=1&spageSize=10&midMenuOn=4&searchType=conAndtit&searchValue="


                    announcements.append({
                        'title': title,
                        'date': date,
                        'views': views,
                        'link': link
                    })

                logger.info(f"Scraped {len(announcements)} announcements")
                await browser.close()
        except Exception as e:
            logger.error(f"Error during scraping: {e}", exc_info=True)
            if 'browser' in locals():
                await browser.close()

        return announcements


async def main():
    scraper = EVPortalNoticeScraper()
    cache_key = "evportal_announcements_cache.json"
    cached_data = await load_cached_data(cache_key)
    new_data = await scraper.scrape()

    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        await save_data_to_cache(cache_key, new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        logger.info(f"Title: {announcement['title']}, Date: {announcement['date']}, Views: {announcement['views']}, Link: {announcement['link']}")

if __name__ == "__main__":
    asyncio.run(main())