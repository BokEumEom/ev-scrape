from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# 웹 드라이버 초기화 (Chrome을 예로 들겠습니다.)
service = Service(excutable_path="./chromedriver.exe")
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)

# 서울시 뉴스 페이지로 이동
driver.get('https://www.seoul.go.kr/news/news_notice.do#list/1/cntPerPage=10&srchText=전기차')

# 페이지가 완전히 로드될 때까지 기다림
time.sleep(5)

# 뉴스 제목을 찾고 출력
news_titles = driver.find_elements(By.XPATH, '//xpath/to/news/titles')

for title in news_titles:
    print(title.text)

# 웹 드라이버 종료
driver.quit()
