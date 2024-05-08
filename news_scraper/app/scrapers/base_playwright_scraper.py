# app/scrapers/base_playwright_scraper.py
from playwright.async_api import async_playwright
import logging

logger = logging.getLogger("BasePlaywrightScraper")

class BasePlaywrightScraper:
    def __init__(self, base_url, path):
        self.base_url = base_url
        self.path = path

    async def fetch_page(self):
        page_content = ""
        browser = None
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto(f"{self.base_url}{self.path}", wait_until="networkidle")
                page_content = await page.content()
        except Exception as e:
            logger.error(f"Error fetching page: {e}")
        finally:
            if 'browser' in locals():
                await browser.close()
        return page_content

    async def scrape(self):
        raise NotImplementedError("This method should be implemented by subclasses.")
