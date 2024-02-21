import requests
from bs4 import BeautifulSoup

def scrape_announce_swn():
    # 웹페이지 URL
    base_url = "https://www.suwon.go.kr"
    path = "/web/board/BD_board.list.do?seq=&bbsCd=1042&pageType=&showSummaryYn=N&delDesc=&q_ctgCd=&q_currPage=1&q_sortName=&q_sortOrder=&q_rowPerPage=10&q_searchKeyType=TITLE___1002&q_searchKey=&q_searchVal=전기차"
    full_url = f"{base_url}{path}"
    response = requests.get(full_url)
    announcements = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # 공고 목록을 포함하는 각 'li' 태그를 찾음
        announcement_items = soup.find_all("tbody")

        for item in announcement_items:
            # 각 'li' 태그 내에서 링크, 제목, 날짜를 포함하는 태그를 찾음
            a_tag = item.find("a", href=True)
            title_tag = item.find("td", class_="p-subject")
            date_tag = item.find("td", class_="p-table__hidden--mobile")

            # 정보 추출
            if a_tag and title_tag and date_tag:
                link = a_tag['href']
                # 상대 링크를 절대 링크로 변환
                if link.startswith('/'):
                    link = base_url + link

                title = title_tag.text.strip()
                date = date_tag.text.strip()

                # 추출된 정보를 저장
                announcements.append({
                    'link': link,
                    'title': title,
                    'date': date
                })

    return announcements

# 스크랩한 데이터를 출력
if __name__ == "__main__":
    scraped_announcements = scrape_announce_swn()
    for announcement in scraped_announcements:
        print(announcement)