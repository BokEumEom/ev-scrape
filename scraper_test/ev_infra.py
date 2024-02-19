import requests
from bs4 import BeautifulSoup

# MS Teams 웹훅 URL 설정
webhook_url = 'https://bepsolar1.webhook.office.com/webhookb2/a3880eed-a600-4942-8e60-9cba346ba10d@71167b62-f79f-4dce-95ba-64f401100ca0/IncomingWebhook/6374b7c2a8d04cdbb158ad5bac6fb980/83b28de9-510f-4cc8-9db7-670eb4bf3306'

# 기본 URL 설정
base_url = 'https://www.seoul.go.kr/news/news_notice.do'
search_url = base_url + '?cp='

# 페이지 번호를 얻기 위한 초기 페이지 로드
initial_response = requests.get(search_url + '1')
initial_soup = BeautifulSoup(initial_response.text, 'html.parser')

# 페이지 번호가 포함된 span 태그 찾기
paging_info = initial_soup.find('span', id='pagingNumberSpan')
page_links = paging_info.find_all('a')  # 모든 페이지 링크를 포함하는 <a> 태그들
total_pages = int(page_links[-1].text)  # 마지막 <a> 태그의 텍스트가 총 페이지 수

# 키워드 리스트 설정
keywords = ['전기차', '급속충전', '완속충전']

# 모든 페이지를 순회하면서 게시물 검색 및 알림 전송
for page in range(1, total_pages + 1):
    # 각 페이지 URL 생성
    page_response = requests.get(search_url + str(page))
    page_soup = BeautifulSoup(page_response.text, 'html.parser')
    
    # 게시물 제목이 포함된 요소 찾기
    posts = page_soup.find_all('td', class_='sib-list-type-basic-subject')

    # 키워드를 포함하는 게시물 필터링
    for post in posts:
        a_tag = post.find('a')
        if a_tag and any(keyword in a_tag.text for keyword in keywords):
            full_link = requests.compat.urljoin(base_url, a_tag['href'])
            
            # MS Teams에 보낼 메시지 생성
            message = {
                "@type": "MessageCard",
                "@context": "http://schema.org/extensions",
                "summary": "새로운 공고 알림",
                "sections": [{
                    "activityTitle": "새로운 공고가 있습니다!",
                    "activitySubtitle": a_tag.text.strip(),
                    "markdown": True,
                    "facts": [{
                        "name": "링크",
                        "value": full_link
                    }]
                }]
            }
            
            # MS Teams에 알림 전송
            headers = {'Content-Type': 'application/json'}
            response = requests.post(webhook_url, json=message, headers=headers)
            
            if response.status_code == 200:
                print(f"페이지 {page}: 메시지를 성공적으로 보냈습니다.")
            else:
                print(f"페이지 {page}: 메시지 전송 실패: {response.status_code}")

# 알림을 보낼 게시물이 없는 경우
if not page_links:
    print("지정된 키워드를 포함하는 새 게시물이 없습니다.")