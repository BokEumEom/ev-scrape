from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# WebDriver 설정
service = Service(excutable_path="./chromedriver.exe")
options = webdriver.ChromeOptions()
options.headless = True  # 브라우저를 머리없는 모드로 실행 (GUI 없이)
driver = webdriver.Chrome(service=service, options=options)

# 기본 URL 설정
base_url = 'https://www.seoul.go.kr/news/news_notice.do#list/'

# 첫 페이지 접속
driver.get(base_url + '1')
# 페이지 로드를 기다림
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'pagingNumberSpan')))

# 총 페이지 수를 가져옴
paging_info = driver.find_element(By.ID, 'pagingNumberSpan')
page_links = paging_info.find_elements(By.TAG_NAME, 'a')
total_pages = int(page_links[-2].text)  # 마지막에서 두 번째 링크가 마지막 페이지 번호

# 모든 페이지를 순회하면서 게시물 검색
for page in range(1, total_pages + 1):
    # URL 해시 변경을 통해 페이지 이동
    driver.get(base_url + str(page))
    
    # 잠시 대기하여 동적 콘텐츠가 로드되도록 함
    time.sleep(5)  # 실제 사이트의 로드 시간에 따라 조절할 수 있습니다.

    # 게시물 제목이 포함된 요소 찾기
    posts = driver.find_elements(By.CLASS_NAME, 'sib-lst-type-basic-subject')

    # '전용차로' 키워드를 포함하는 게시물 필터링 및 콘솔에 출력
    for post in posts:
        a_tag = post.find_element(By.TAG_NAME, 'a')
        if '전용차로' in a_tag.text:
            title = a_tag.text.strip()
            full_link = a_tag.get_attribute('href')
            print(f"Title: {title}\nLink: {full_link}\n")

# WebDriver 종료
driver.quit()
