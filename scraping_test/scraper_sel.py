import requests
from bs4 import BeautifulSoup

def scrape_announce_sel():
    # 웹페이지 URL
    base_url = "https://www.seoul.go.kr"
    path = "/news/news_notice.do#list/1/cntPerPage=10&srchText=전기차"
    full_url = f"{base_url}{path}"
    response = requests.get(full_url)
    announcements = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # 공고 목록을 포함하는 'tr' 태그를 찾음
        announcement_rows = soup.find_all("tr")

        for row in announcement_rows:
            # 'a' 태그 내의 공고 제목과 링크 추출
            a_tag = row.select_one(".sib-lst-type-basic-subject > a")
            # 날짜를 포함하는 'td' 태그 추출
            date_td = row.select_one(".sib-lst-type-basic-tablet-hidden:nth-of-type(4)")

            if a_tag and date_td:
                title = a_tag.text.strip()
                link = a_tag.get('href', '')
                # 날짜 텍스트 추출 및 정리
                date_text = date_td.text.strip()

                # 상대 링크를 절대 링크로 변환
                if link.startswith('/'):
                    link = f"{base_url}{link}"

                announcements.append({
                    'title': title,
                    'link': link,
                    'date': date_text
                })

    return announcements

# 스크랩한 데이터를 출력하는 테스트 코드
if __name__ == "__main__":
    scraped_announcements = scrape_announce_sel()
    for announcement in scraped_announcements:
        print(announcement)