# FastAPI News Aggregator API

## Introduction
This FastAPI project is designed to aggregate news from various sources, including Google News, and announcements from local governments like Incheon and Kyungki, as well as Seoul city. Utilizing advanced web scraping techniques and FastAPI's asynchronous support, this API provides users with up-to-date news and announcements, efficiently filtered to remove duplicates and sorted by relevance.

## Features
- Aggregate news from Google News and local announcements.
- Efficient duplicate removal using cosine similarity.
- Sort news items by publication date.
- Endpoints for fetching news items and public announcements.
- In-memory storage for comments and votes related to news items.

## Installation
Ensure you have Python 3.6+ installed on your system. This project also recommends the use of **pip** for package management.

## Clone the repository:

```bash
Copy code
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

## Install dependencies:

```bash
Copy code
pip install -r requirements.txt
```

## Running the Project
Start the FastAPI server with uvicorn:

```bash
Copy code
uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000.

## API Endpoints
- GET /announce/icn/: Fetch Incheon city announcements.
- GET /announce/kyki/: Fetch Kyungki province announcements.
- GET /announce/seoul/: Fetch Seoul city announcements.
- GET /news: Fetch aggregated news items.
- POST /comments/: Submit a comment on a news item.
- GET /comments/{news_id}: Fetch comments for a specific news item.
- POST /comments/vote: Vote on a specific comment.
- POST /vote/{news_id}: Submit a vote on a news item.

## Documentation
Visit http://127.0.0.1:8000/docs for the Swagger UI documentation of all API endpoints.

## Development
This project uses logging for debugging and operational logging. Ensure proper logging configuration in config.py to suit your development needs.