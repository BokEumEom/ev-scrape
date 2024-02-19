import aiohttp
import asyncio
import datetime
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

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def scrape_google_news(keywords, page=1, results_per_page=10):
    rss_url = generate_rss_url(keywords)
    async with aiohttp.ClientSession() as session:
        html = await fetch(session, rss_url)
        soup = BeautifulSoup(html, 'xml')
        items = soup.find_all('item')

        news_items = [await parse_news_item_async(item) for item in items]
        news_items = [item for item in news_items if item]  # Remove None entries
        news_items = remove_duplicates(news_items)
        news_items.sort(key=lambda x: x['pubDate'], reverse=True)
        paginated_items = paginate_items(news_items, page, results_per_page)
        return paginated_items

async def parse_news_item_async(item):
    try:
        title = item.find('title').text.split(' - ')[0].strip()
        link = item.find('link').text
        pub_date = parse(item.find('pubDate').text)
        source = item.find('source').text if item.find('source') else 'Unknown Source'
        description_html = item.find('description').text
        summary = BeautifulSoup(description_html, 'html.parser').text.strip()

        return {
            "title": title,
            "link": link,
            "pubDate": pub_date,
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
        if isinstance(item['pubDate'], datetime.datetime):
            item['pubDate'] = item['pubDate'].strftime('%Y-%m-%d %H:%M:%S')

    return paginated_items

if __name__ == "__main__":
    # Example usage
    asyncio.run(scrape_google_news(["전기차"], page=1))
