# app/scraping_functions.py
import requests
from bs4 import BeautifulSoup
import logging
import re
from urllib.parse import quote_plus, urlencode, parse_qsl, urlparse

# Disable InsecureRequestWarning
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ScrapingError(Exception):
    """A custom exception for scraping-related errors."""
    
def transform_gyeonggi_link(onclick_value):
    # Extract the board_seq ID using a regex pattern from the onclick attribute.
    match = re.search(r"goBoardView\('(\d+)'\)", onclick_value)
    if match:
        board_seq = match.group(1)
        return f"https://ggeea.or.kr/energy/news/view?board_seq={board_seq}&currRow=1&select_list=all&srch_input=전기자동차"
    else:
        # If the pattern is not found, return None or raise an error as appropriate.
        return None
    
def transform_koroad_link(href):
    # Assuming href contains the relative URL extracted from the 'a' element's href attribute
    base_url = "https://www.koroad.or.kr"
    # Parse the query string into a dictionary
    query_params = dict(parse_qsl(urlparse(href).query))
    
    # Correctly encode the 'sv' parameter to ensure only one level of encoding
    if 'sv' in query_params:
        query_params['sv'] = quote_plus('전기차')
    
    # Construct the full URL
    full_url = f"{base_url}/main/bid/bid_etc_view.do?" + urlencode(query_params)
    
    return full_url

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
        # Added verify=False to bypass SSL verification
        response = requests.get(full_url, verify=False)
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

def scrape_gyeonggi_announcements():
    return generic_scrape_announcements(
        base_url="https://ggeea.or.kr",
        path="/energy/news?board_seq=0&currRow=1&select_list=all&srch_input=전기자동차",
        selectors={
            'announcement': "tbody tr",
            'title': "td.board_left a",
            'date': "td:nth-of-type(3)",  # Adjust as per actual structure
            'link': "td.board_left a"  # Adjusted to select the correct element with the onclick attribute
        },
        transform_link=transform_gyeonggi_link  # Passing the onclick value to the transform function
    )
    
def scraper_koroad_announcements():
    return generic_scrape_announcements(
        base_url="https://www.koroad.or.kr",
        path="/main/bid/bid_etc_list.do?sc=&sv=전기차",  # The exact path if necessary
        selectors={
            'announcement': "tr",  # Assuming each announcement is within a table row
            'title': "td.tit.left > div.link > a",  # Assuming 'tit' and 'left' are separate classes
            'date': "td.date > span",  # Direct child selector for span within td with class 'date'
            'link': "td.tit.left > div.link > a"  # Assuming link is in an <a> tag
        },
        transform_link=transform_koroad_link  # Use the newly defined function
    )

if __name__ == "__main__":
    # Scrape and print announcements for both Incheon and Gyeonggi
    try:
        print("Incheon Announcements:")
        for announcement in scrape_incheon_announcements():
            print(announcement)

        print("\nGyeonggi Announcements:")
        for announcement in scrape_gyeonggi_announcements():
            print(announcement)
            
        print("\nKoroad Announcements:")
        for announcement in scraper_koroad_announcements():
            print(announcement)

    except ScrapingError as e:
        logger.error(f"Scraping failed: {e}")
