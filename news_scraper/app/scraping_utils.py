# app/scraping_utils.py
from .cache_management import load_cached_data, save_data_to_cache, get_md5_hash
from .announce_models import Announcement

async def fetch_announcements_with_caching(scrape_function, region: str):
    cached_data = await load_cached_data(region)
    new_data = await scrape_function()
    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        await save_data_to_cache(region, new_data)
    return new_data
