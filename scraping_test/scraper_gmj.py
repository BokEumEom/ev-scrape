from urllib.parse import urlencode
import re
import requests
from bs4 import BeautifulSoup

def parse_pagination(soup):
    try:
        last_page_str = soup.select_one('tbody > tr > td.text_center').text.strip().split()[1]
        last_page = int(re.sub('\D', '', last_page_str))
        
        return last_page
    except Exception:
        return None

def scrape_announce_gmj():
    base_url = "https://www.gwangju.go.kr"
    path = "/contentsView.do?pageId=www791&pgMnuIdx=8536"
    
    announcements = []
    current_page = 1
    max_pages = 1

    while True:
        params = {'pageIndex': current_page}
        url = base_url + path + '?' + urlencode(params)

        response = requests.get(url)
        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.content, 'lxml')
        max_pages = parse_pagination(soup)

        if max_pages <= current_page:
            break

        announcement_items = soup.find_all("tr")

        for item in announcement_items[1:]:
            a_tag = item.find("a", href=True)
            title_tag = item.find("td", class_="d_tb_left")
            date_tag = item.find("td", class_="d_tb_center")

            if a_tag and title_tag and date_tag:
                link = a_tag['href']
                if link.startswith('/'):
                    link = base_url + link
                title = title_tag.text.strip()
                date = date_tag.text.strip()

                if ('전기차' in title) or ('/전기차/' in link):
                    announcements.append({
                        'link': link,
                        'title': title,
                        'date': date
                    })

        current_page += 1

    return announcements

# Test the function here
announcements = scrape_announce_gmj()
for announcement in announcements:
    print(announcement)