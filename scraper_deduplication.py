import requests
from bs4 import BeautifulSoup
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ScrapingError(Exception):
    """A custom exception for scraping-related errors."""

def generic_scrape_announcements(base_url, path, selectors, transform_link=None):
    """
    A generic function to scrape announcements.

    Parameters:
    - base_url: The base URL of the website
    - path: The specific path to scrape from
    - selectors: A dictionary containing CSS selectors for the announcements, titles, dates, and optionally links
    - transform_link: A function to transform the link if necessary (e.g., append the base URL)
    """
    full_url = f"{base_url}{path}"
    announcements = []

    try:
        response = requests.get(full_url)
        if response.status_code != 200:
            raise ScrapingError(f"Failed to fetch announcements, status code: {response.status_code}")

        soup = BeautifulSoup(response.text, 'html.parser')
        items = soup.select(selectors['announcement'])

        for item in items:
            title_element = item.select_one(selectors['title'])
            date_element = item.select_one(selectors['date'])
            link_element = item.select_one(selectors['link']) if 'link' in selectors else item.find('a')

            if title_element and date_element and link_element:
                title = title_element.get_text(strip=True)
                date = date_element.get_text(strip=True)
                link = link_element['href']
                if transform_link:
                    link = transform_link(link)

                announcements.append({'title': title, 'date': date, 'link': link})
            else:
                logger.warning("Skipping an announcement due to missing information")

    except requests.RequestException as e:
        logger.error(f"Network error occurred: {e}")
        raise ScrapingError("Network error occurred during scraping") from e
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise ScrapingError("Unexpected error occurred during scraping") from e

    return announcements

# Define the specific scraping details for Incheon and Kyungki
def scrape_incheon_announcements():
    return generic_scrape_announcements(
        base_url="https://www.incheon.go.kr",
        path="/IC010205?beginDt=&endDt=&srchMainManagerDeptNm=&srchRepTitle=전기차",
        selectors={
            'announcement': "li",
            'title': "strong.subject",
            'date': "dd",
            'link': "a"
        },
        transform_link=lambda link: "https://www.incheon.go.kr" + link if not link.startswith('http') else link
    )

def scrape_kyungki_announcements():
    return generic_scrape_announcements(
        base_url="https://ggeea.or.kr",
        path="/energy/news?board_seq=0&currRow=1&select_list=all&srch_input=전기자동차",
        selectors={
            'announcement': "tbody tr",
            'title': "td.board_left a",
            'date': "td:nth-of-type(3)",  # Adjust as per actual structure
            'link': "a"
        },
        transform_link=lambda link: "https://ggeea.or.kr" + link if not link.startswith('http') else link
    )

if __name__ == "__main__":
    # Scrape and print announcements for both Incheon and Kyungki
    try:
        print("Incheon Announcements:")
        for announcement in scrape_incheon_announcements():
            print(announcement)

        print("\nKyungki Announcements:")
        for announcement in scrape_kyungki_announcements():
            print(announcement)

    except ScrapingError as e:
        logger.error(f"Scraping failed: {e}")
