import requests
from bs4 import BeautifulSoup

def extract_announcement_details(row, base_url):
    # Extract the title and link using the 'board_left' class for the title's <td>
    title_td = row.find('td', class_='board_left')
    link_js = title_td.find('a', href=True)['href']
    
    # Extract the identifier from the JavaScript function call
    identifier = link_js.split("'")[1] if "goBoardView" in link_js else None
    if identifier:
        link = f"{base_url}/energy/news/view?board_seq={identifier}"
    else:
        link = 'No link available'

    title = title_td.get_text(strip=True)
    
    # Extract the date, which is assumed to be in the next <td> element
    date_td = title_td.find_next_sibling('td')
    date = date_td.get_text(strip=True) if date_td else 'No date available'

    return {
        'link': link,
        'title': title,
        'date': date
    }

def scrape_announce_kyki():
    base_url = "https://ggeea.or.kr"
    path = "/energy/news?board_seq=0&currRow=1&select_list=all&srch_input=전기자동차"
    full_url = f"{base_url}{path}"
    response = requests.get(full_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    announcements = []

    tbody = soup.find('tbody')
    if tbody:
        rows = tbody.find_all('tr')
        for row in rows:
            announcement = extract_announcement_details(row, base_url)
            announcements.append(announcement)

    return announcements

# 스크랩한 데이터를 출력
if __name__ == "__main__":
    scraped_announcements = scrape_announce_kyki()
    for announcement in scraped_announcements:
        print(announcement)