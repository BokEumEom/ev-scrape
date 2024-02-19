import requests
from bs4 import BeautifulSoup
from dateutil.parser import parse
import logging
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Improved the logging setup to include the level and format for easier debugging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def generate_rss_url(keywords, language="ko", country_code="KR"):
    """
    Generates a Google News RSS feed URL based on the given keywords, language, and country code.
    """
    query = "+".join(keywords)
    return f"https://news.google.com/rss/search?q={query}&hl={language}&gl={country_code}&ceid={country_code}:{language}"

def scrape_google_news(keywords, page=1, results_per_page=10):
    """
    Scrapes Google News based on the given keywords, page number, and results per page.
    It utilizes RSS for fetching news items and applies cosine similarity to filter out duplicates.
    """
    try:
        rss_url = generate_rss_url(keywords)
        response = requests.get(rss_url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'xml')
        items = soup.find_all('item')

        news_items = []

        for item in items:
            news_item = parse_news_item(item)
            if news_item:
                news_items.append(news_item)

        news_items = remove_duplicates(news_items)

        # Sorting news items by publication date in descending order
        news_items.sort(key=lambda x: x['pubDate'], reverse=True)

        # Paginating the sorted news items
        paginated_items = paginate_items(news_items, page, results_per_page)

        return paginated_items

    except requests.RequestException as e:
        logger.error(f"Request error occurred: {e}")
        return []
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return []

def parse_news_item(item):
    """
    Parses a single news item from the RSS feed and returns a dictionary of its details.
    """
    try:
        title = item.find('title').text
        link = item.find('link').text
        pub_date = parse(item.find('pubDate').text)
        source = item.find('source').text if item.find('source') else 'Unknown Source'
        description_html = item.find('description').text
        summary = BeautifulSoup(description_html, 'html.parser').text.strip()

        return {
            "title": title,
            "link": link,
            "pubDate": pub_date,  # Keeping as datetime object for now
            "summary": summary,
            "source": source,
        }
    except Exception as e:
        logger.error(f"Error parsing news item: {e}")
        return None

def remove_duplicates(news_items):
    """
    Removes duplicate news items based on their titles using cosine similarity.
    """
    titles = [item['title'] for item in news_items]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(titles)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    unique_indices = set()
    threshold = 0.5
    for i in range(len(titles)):
        if not any(cosine_sim[i][j] > threshold and j != i for j in range(len(titles))):
            unique_indices.add(i)

    return [news_items[i] for i in unique_indices]

def paginate_items(news_items, page, results_per_page):
    """
    Paginates the news items based on the specified page number and results per page.
    Converts publication dates back to strings for the output.
    """
    start_index = (page - 1) * results_per_page
    end_index = start_index + results_per_page
    paginated_items = news_items[start_index:end_index]

    for item in paginated_items:
        item['pubDate'] = item['pubDate'].strftime('%Y-%m-%d %H:%M:%S')

    return paginated_items

if __name__ == "__main__":
    # Example usage
    keywords = ["전기차"]
    news_items = scrape_google_news(keywords, page=1)
    for item in news_items:
        print(f"Title: {item['title']}\nLink: {item['link']}\nSummary: {item['summary']}\nDate: {item['pubDate']}\nSource: {item['source']}\n")
