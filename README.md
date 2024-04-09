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

## Key Components

- **`main.py`**: The entry point of the FastAPI application. It includes route definitions, middleware configurations, and application lifecycle hooks.

- **`config.py`**: Contains configuration settings for the application, such as database connection settings and logging configurations.

- **`database.py`**: Defines the database session and engine, used for interacting with the database asynchronously.

- **`models.py`**: Contains SQLAlchemy models that represent database tables.

- **`schemas.py`**: Defines Pydantic models for request and response data validation.

- **`crud.py`**: Contains functions for CRUD operations on the database, abstracting away direct database access.

- **`rss_parser.py`** and **`rss_scheduler.py`**: Handle parsing RSS feeds and scheduling RSS feed updates, respectively.

- **`scrapers/`**: A directory containing various web scrapers for collecting data from external sources.

- **`utils/`**: Contains utility functions and classes that support the main application functionality, such as cache management and scraping utilities.

- **`api/v1/endpoints/`**: This directory contains the API route definitions for different parts of the application, organized by version (`v1`) and resource (`community`, `news`).

## Development Notes

- The application uses **FastAPI** for creating RESTful APIs with automatic Swagger documentation.

- **SQLAlchemy** (asynchronous version) is used for ORM, and **Alembic** can be integrated for database migrations.

- The application is structured to support easy addition of new features, such as new web scrapers or API endpoints, without significant refactoring.

- **CORS** middleware is configured in `main.py` to allow cross-origin requests, necessary for frontend integration during development.

- The project follows a modular structure, making it easier to manage and test individual components independently.

## Getting Started

To get started with the backend server, ensure you have Python 3.8+ installed, and follow these steps:

1. Install the required dependencies: `pip install -r requirements.txt`
2. Run the FastAPI server: `uvicorn app.main:app --reload`

Visit `http://127.0.0.1:8000/docs` in your browser to see the API documentation and test out the endpoints.

## API Endpoints

Below is a table of the API endpoints available in this application, providing functionalities related to fetching announcements for specific regions, managing news items, comments, and voting.

| Method | Endpoint                 | Description                                        |
|--------|--------------------------|----------------------------------------------------|
| GET    | `/announce/icn/`         | Fetch announcements for Incheon city.              |
| GET    | `/announce/kyki/`        | Fetch announcements for Kyungki province.          |
| GET    | `/announce/seoul/`       | Fetch announcements for Seoul city.                |
| GET    | `/news`                  | Fetch aggregated news items.                       |
| POST   | `/comments/`             | Submit a comment on a news item.                   |
| GET    | `/comments/{news_id}`    | Fetch comments for a specific news item.           |
| POST   | `/comments/vote`         | Vote on a specific comment.                        |
| POST   | `/vote/{news_id}`        | Submit a vote on a news item.                      |

## Usage

Each endpoint serves a specific function within the application, allowing users to interact with announcements, news items, and comments in various ways. Users can fetch announcements from specific regions using the GET methods for `/announce/icn/`, `/announce/kyki/`, and `/announce/seoul/`. The `/news` endpoint aggregates news items for easy access.

For interactive engagement, users can submit comments on news items via `/comments/` and vote on their favorite comments or news items using the `/comments/vote` and `/vote/{news_id}` endpoints respectively. Fetching comments for a specific news item is also straightforward using the `/comments/{news_id}` endpoint.

## Notes

- Replace `{news_id}` with the actual ID of the news item you are interested in.
- For voting endpoints, ensure to provide the necessary payload as per the API documentation.
- These endpoints are designed to enhance user interaction and engagement with the content provided by the application.
