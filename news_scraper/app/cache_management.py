import aiofiles
import json
import os
from hashlib import md5
import logging

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

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