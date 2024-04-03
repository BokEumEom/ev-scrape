# app/scrapers/base_scraper.py
from abc import ABC, abstractmethod
from ..utils.scraping_utils import fetch_html
import logging

class BaseScraper(ABC):
    base_url = ""
    path = ""
    selectors = {}

    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)

    async def scrape(self):
        try:
            html = await fetch_html(self.get_full_url())
            if not html:
                self.logger.error("Failed to fetch HTML content.")
                return []
            return await self.scrape_specific(html)
        except Exception as e:
            self.logger.error(f"Error during scraping: {e}")
            return []

    @abstractmethod
    async def scrape_specific(self, html: str):
        pass

    def get_full_url(self):
        return f"{self.base_url}{self.path}"
