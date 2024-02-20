import requests
from bs4 import BeautifulSoup
import logging

# Configure logging at the module level, or use a configured logger from your application's logging setup.
logger = logging.getLogger(__name__)

class ScrapingError(Exception):
    """Custom exception for scraping errors."""
    pass

def scrape_incheon_announcements():
    base_url = "https://www.incheon.go.kr"
    path = "/IC010205?beginDt=&endDt=&srchMainManagerDeptNm=&srchRepTitle=전기차"
    full_url = f"{base_url}{path}"
    announcements = []

    try:
        response = requests.get(full_url)
        if response.status_code != 200:
            # Log and raise an exception if the request failed
            logger.error(f"Failed to fetch announcements, status code: {response.status_code}")
            raise ScrapingError(f"Request failed with status {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        announcement_items = soup.find_all("li")

        for item in announcement_items:
            a_tag = item.find("a", href=True)
            title_tag = item.find("strong", class_="subject")
            date_tag = item.find("dd")

            if a_tag and title_tag and date_tag:
                link = base_url + a_tag['href'] if a_tag['href'].startswith('/') else a_tag['href']
                title = title_tag.text.strip()
                date = date_tag.text.strip()
                announcements.append({'link': link, 'title': title, 'date': date})

    except requests.RequestException as e:
        logger.error(f"Network error occurred while fetching announcements: {e}", exc_info=True)
        raise ScrapingError("Network error occurred during scraping") from e
    except Exception as e:
        logger.error(f"Unexpected error occurred while scraping: {e}", exc_info=True)
        raise ScrapingError("Unexpected error occurred during scraping") from e

    return announcements

# 스크랩한 데이터를 출력
if __name__ == "__main__":
    try:
        scraped_announcements = scrape_incheon_announcements()
        for announcement in scraped_announcements:
            print(announcement)
    except ScrapingError as e:
        logger.error(f"Failed to scrape announcements: {e}")