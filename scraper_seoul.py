from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from webdriver_manager.chrome import ChromeDriverManager
from models import SeoulAnnouncement
import urllib.parse
import json
import os
from hashlib import md5
import logging

# Setup logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

CACHE_FILE_PATH = 'seoul_announcements_cache.json'

def load_cached_data():
    """Load cached data from a JSON file."""
    try:
        if os.path.exists(CACHE_FILE_PATH):
            with open(CACHE_FILE_PATH, 'r', encoding='utf-8') as file:
                return json.load(file)
    except Exception as e:
        logger.error(f"Failed to load cached data: {e}")
    return []

def save_data_to_cache(data):
    """Save data to a cache file."""
    try:
        with open(CACHE_FILE_PATH, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Failed to save data to cache: {e}")

def get_md5_hash(data):
    """Generate an MD5 hash of the given data."""
    return md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()

def scrape_seoul_announcements():
    try:
        service = Service(executable_path=ChromeDriverManager().install())
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome(service=service, options=options)

        search_term = urllib.parse.quote('전기차')
        url = f'https://www.seoul.go.kr/news/news_notice.do#list/1/cntPerPage=10&srchText={search_term}'

        driver.get(url)
        time.sleep(3)  # Consider using WebDriverWait for more reliable synchronization

        announcements = []
        posts = driver.find_elements(By.XPATH, "//td[contains(@class,'sib-lst-type-basic-subject')]/..")
        for post in posts:
            title_data = post.find_element(By.CLASS_NAME, 'sib-lst-type-basic-subject')
            a_tag = title_data.find_element(By.TAG_NAME, 'a')
            date_data = post.find_element(By.XPATH, ".//td[5]")

            if '전기차' in a_tag.text:
                announcement = SeoulAnnouncement(
                    title=a_tag.text.strip(),
                    date=date_data.text.strip(),
                    link=a_tag.get_attribute('href')
                )
                announcements.append(announcement.dict())
    except Exception as e:
        logger.error(f"Failed to scrape Seoul announcements: {e}")
        return []
    finally:
        driver.quit()

    return announcements

if __name__ == "__main__":
    cached_data = load_cached_data()
    new_data = scrape_seoul_announcements()

    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        logger.info('New data found, updating cache.')
        save_data_to_cache(new_data)
    else:
        logger.info('No new data. Using cached data.')

    for announcement in new_data:
        print(announcement)
