from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from webdriver_manager.chrome import ChromeDriverManager  # Make sure to import ChromeDriverManager
from models import Announcement  # Import the model from models.py
import urllib

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
        title_data = post.find_element(By.CLASS_NAME, 'sib-lst-type-basic-subject')
        a_tag = title_data.find_element(By.TAG_NAME, 'a')
        date_data = post.find_element(By.XPATH, ".//td[5]")

        if '전기차' in a_tag.text:
            announcement = Announcement(
                title=a_tag.text.strip(),
                date=date_data.text.strip(),
                link=a_tag.get_attribute('href')
            )
            announcements.append(announcement.dict())  # Convert the Pydantic model to a dictionary

    driver.quit()
    return announcements

# 스크랩한 데이터를 출력
if __name__ == "__main__":
    try:
        scraped_announcements = scrape_seoul_announcements()
        for announcement in scraped_announcements:
            print(announcement)
    except Exception as e:
        print(f"An error occurred: {e}")