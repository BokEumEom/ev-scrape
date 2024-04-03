# app/utils/cache_management.py
import json
import aiofiles
from hashlib import md5

async def load_cached_data(file_path):
    """Load data from the cache file."""
    try:
        async with aiofiles.open(file_path, 'r', encoding='utf-8') as file:
            data = await file.read()
            return json.loads(data)
    except Exception as e:
        # Handle exceptions
        return []

async def save_data_to_cache(file_path, data):
    """Save data to the cache file."""
    try:
        async with aiofiles.open(file_path, 'w', encoding='utf-8') as file:
            await file.write(json.dumps(data, ensure_ascii=False))
    except Exception as e:
        # Handle exceptions
        pass

def get_md5_hash(data):
    """Generate an MD5 hash for the given data."""
    return md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()
