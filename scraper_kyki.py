import requests
from bs4 import BeautifulSoup
import logging

# Create or configure a logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class ScrapingError(Exception):
    """Custom exception for errors during scraping."""

def extract_announcement_details(row, base_url):
    try:
        title_td = row.find('td', class_='board_left')
        link_js = title_td.find('a', href=True)['href']
        
        identifier = link_js.split("'")[1] if "goBoardView" in link_js else None
        if identifier:
            link = f"{base_url}/energy/news/view?board_seq={identifier}"
        else:
            link = 'No link available'

        title = title_td.get_text(strip=True)
        
        date_td = title_td.find_next_sibling('td')
        date = date_td.get_text(strip=True) if date_td else 'No date available'

        return {'link': link, 'title': title, 'date': date}
    except Exception as e:
        logger.error(f"Error extracting announcement details: {e}", exc_info=True)
        return None

def scrape_kyungki_announcements():
    base_url = "https://ggeea.or.kr"
    path = "/energy/news?board_seq=0&currRow=1&select_list=all&srch_input=전기자동차"
    full_url = f"{base_url}{path}"
    announcements = []

    try:
        response = requests.get(full_url)
        if response.status_code != 200:
            logger.error(f"Failed to fetch announcements, status code: {response.status_code}")
            raise ScrapingError(f"Request failed with status {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        tbody = soup.find('tbody')
        if tbody:
            rows = tbody.find_all('tr')
            for row in rows:
                announcement = extract_announcement_details(row, base_url)
                if announcement:  # Ensure that announcement is not None
                    announcements.append(announcement)
    except requests.RequestException as e:
        logger.error(f"Network error occurred while fetching announcements: {e}", exc_info=True)
        raise ScrapingError("Network error occurred during scraping") from e
    except Exception as e:
        logger.error(f"Unexpected error occurred while scraping: {e}", exc_info=True)
        raise ScrapingError("Unexpected error occurred during scraping") from e

    return announcements

if __name__ == "__main__":
    try:
        scraped_announcements = scrape_kyungki_announcements()
        for announcement in scraped_announcements:
            print(announcement)
    except ScrapingError as e:
        logger.error(f"Failed to scrape announcements: {e}")
