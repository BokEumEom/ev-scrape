# /scrapers/scraper.py
import requests
from bs4 import BeautifulSoup
from dateutil.parser import parse
import logging
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.news import News

# Enhanced logging setup for improved debugging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def generate_rss_url(keywords, language="ko", country_code="KR"):
    query = "+".join(keywords)
    return f"https://news.google.com/rss/search?q={query}&hl={language}&gl={country_code}&ceid={country_code}:{language}"

def scrape_google_news(keywords, page=1, results_per_page=10):
    # Create a new database session
    db: Session = SessionLocal()
    try:
        rss_url = generate_rss_url(keywords)
        response = requests.get(rss_url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'xml')
        items = soup.find_all('item')

        news_items = [parse_news_item(item) for item in items if parse_news_item(item)]

        # Remove duplicates and sort the news items
        news_items = remove_duplicates(news_items)
        news_items.sort(key=lambda x: x['pubDate'], reverse=True)

        # Store news items in the database
        for news_item in news_items:
            new_news = News(
                title=news_item['title'],
                source=news_item['source'],
                link=news_item['link'],
                publication_date=news_item['pubDate']
            )
            db.add(new_news)
        db.commit()
        
        # Return the paginated news items
        return paginate_items(news_items, page, results_per_page)
    except requests.RequestException as e:
        logger.error(f"Request error: {e}")
        db.rollback()
        return []
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        db.rollback()
        return []
    finally:
        db.close()

def parse_news_item(item):
    try:
        title = item.find('title').text.split(' - ')[0].strip()
        link = item.find('link').text
        pub_date = parse(item.find('pubDate').text)
        source = item.find('source').text if item.find('source') else 'Unknown Source'
        description_html = item.find('description').text
        summary = BeautifulSoup(description_html, 'html.parser').text.strip()

        return {"title": title, "link": link, "pubDate": pub_date, "summary": summary, "source": source}
    except Exception as e:
        logger.error(f"Parsing error: {e}")
        return None

def remove_duplicates(news_items):
    titles = [item['title'] for item in news_items]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(titles)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    unique_indices = {i for i, row in enumerate(cosine_sim) if not any(row[j] > 0.5 and j != i for j in range(len(titles)))}
    return [news_items[i] for i in unique_indices]

def paginate_items(news_items, page, results_per_page):
    start_index = (page - 1) * results_per_page
    end_index = min(start_index + results_per_page, len(news_items))
    paginated_items = news_items[start_index:end_index]

    for item in paginated_items:
        item['pubDate'] = item['pubDate'].strftime('%Y-%m-%d %H:%M:%S')

    return paginated_items

if __name__ == "__main__":
    keywords = ["전기차"]
    news_items = scrape_google_news(keywords)
    for item in news_items:
        print(f"Title: {item['title']}\nLink: {item['link']}\nSummary: {item['summary']}\nDate: {item['pubDate']}\nSource: {item['source']}\n")
