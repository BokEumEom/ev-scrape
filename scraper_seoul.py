from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from webdriver_manager.chrome import ChromeDriverManager  # Make sure to import ChromeDriverManager
from models import SeoulAnnouncement  # Import the model from models.py
import urllib.parse
import json
import os
from hashlib import md5

# 캐시 파일 경로
CACHE_FILE_PATH = 'seoul_announcements_cache.json'

def load_cached_data():
    """캐시된 데이터를 불러오는 함수"""
    if os.path.exists(CACHE_FILE_PATH):
        with open(CACHE_FILE_PATH, 'r', encoding='utf-8') as file:
            return json.load(file)
    return []

def save_data_to_cache(data):
    """데이터를 캐시에 저장하는 함수"""
    with open(CACHE_FILE_PATH, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False)

def get_md5_hash(data):
    """데이터의 MD5 해시를 반환하는 함수"""
    return md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()

def scrape_seoul_announcements():
    # Make sure to call ChromeDriverManager().install() within the Service constructor
    service = Service(executable_path=ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.headless = True  # Optional: use headless mode to not show the browser window
    driver = webdriver.Chrome(service=service, options=options)

    search_term = urllib.parse.quote('전기차')
    url = f'https://www.seoul.go.kr/news/news_notice.do#list/1/cntPerPage=10&srchText={search_term}'

    driver.get(url)
    time.sleep(3)

    announcements = []
    posts = driver.find_elements(By.XPATH, "//td[contains(@class,'sib-lst-type-basic-subject')]/..")
    for post in posts:
        try:
            title_data = post.find_element(By.CLASS_NAME, 'sib-lst-type-basic-subject')
            a_tag = title_data.find_element(By.TAG_NAME, 'a')
            date_data = post.find_element(By.XPATH, ".//td[5]")

            if '전기차' in a_tag.text:
                announcement = SeoulAnnouncement(
                    title=a_tag.text.strip(),
                    date=date_data.text.strip(),
                    link=a_tag.get_attribute('href')
                )
                announcements.append(announcement.dict())  # Convert the Pydantic model to a dictionary
        except Exception as e:
            print(f"Error processing post: {e}")

    driver.quit()
    return announcements

# 스크랩한 데이터를 출력
if __name__ == "__main__":
    cached_data = load_cached_data()
    new_data = scrape_seoul_announcements()

    if not cached_data or get_md5_hash(cached_data) != get_md5_hash(new_data):
        print('New data found, updating cache.')
        save_data_to_cache(new_data)
    else:
        print('No new data. Using cached data.')

    for announcement in new_data:
        print(announcement)