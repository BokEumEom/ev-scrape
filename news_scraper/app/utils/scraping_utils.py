# app/utils/scraping_utils.py
import aiohttp
from bs4 import BeautifulSoup
from urllib.parse import urlencode

async def fetch_html(url: str) -> str:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, verify_ssl=False) as response:
                response.raise_for_status()
                return await response.text()
    except aiohttp.ClientError as e:
        # Log the specific client error and return a meaningful error message or None
        print(f"Client error: {e}")
        return None
    except Exception as e:
        # Log unexpected errors
        print(f"Unexpected error: {e}")
        return None

def parse_html(html: str, selectors: dict) -> list:
    soup = BeautifulSoup(html, 'html.parser')
    items = soup.select(selectors['announcement'])
    return items

def transform_link(href: str, base_url: str = "", params: dict = None) -> str:
    if params:
        query_string = urlencode(params)
        return f"{base_url}{href}?{query_string}"
    return f"{base_url}{href}"
