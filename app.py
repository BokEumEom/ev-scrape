from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import uvicorn, uuid
import logging

# Assuming models.py and config.py are in the same directory as this file
from models import Comment, Announcement, CommentVote, Vote
from config import setup_logging

# Assuming scraper functions are in the scraper.py and scraper_icn.py files respectively
from scraper import scrape_google_news
# from scraper_icn import scrape_incheon_announcements
# from scraper_kyki import scrape_kyungki_announcements
# from scraper_seoul import scrape_seoul_announcements
from scraper_seoul_playwright import scrape_seoul_announcements
from scraper_deduplication import scrape_incheon_announcements, scrape_kyungki_announcements

app = FastAPI()

# 로깅 설정 호출
setup_logging()

# Serve static files like CSS and JavaScript from the "static" directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up Jinja2 templates to render HTML
templates = Jinja2Templates(directory="templates")

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
   
# 각 뉴스 ID에 대한 투표 수를 저장하는 딕셔너리
votes: Dict[int, Dict[str, int]] = {}

# In-memory database to store comments
comments_db: List[Dict[str, Optional[int]]] = []

async def news_exists(news_id: int) -> bool:
    # 실제 애플리케이션에서는 여기에서 데이터베이스를 조회하여
    # 주어진 news_id가 존재하는지 확인해야 합니다.
    # 예시를 위해 모든 news_id가 유효하다고 가정합니다.
    return True

# 인천시 고시공고
@app.get("/announce/icn/", response_model=List[Announcement])
async def get_icn_announcements():
    try:
        announcements_data = scrape_incheon_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")
    
# 경기도 사업공고
@app.get("/announce/kyki/", response_model=List[Announcement])
async def get_kyki_announcements():
    try:
        announcements_data = scrape_kyungki_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")

# 서울시 사업공고             
@app.get("/announce/seoul/", response_model=List[Announcement])
async def get_seoul_announcements():
    try:
        # Ensure scrape_seoul_announcements() is awaited if it's an async function
        announcements_data = await scrape_seoul_announcements()
        return announcements_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching announcements: {str(e)}")
 
# 뉴스 API   
@app.get("/news", response_model=Dict[str, Any])
async def get_news(page: int = Query(1, ge=1), limit: int = Query(10, ge=1)):
    try:
        news_list = scrape_google_news(["전기차"], page=page, results_per_page=limit)
        # 각 뉴스 항목에 고유 식별자 추가
        for index, news in enumerate(news_list, start=1):
            news['id'] = str(uuid.uuid4())  # 또는 index를 사용하여 고유 식별자 생성
        nextPageAvailable = len(news_list) == limit
        return {"news": news_list, "nextPageAvailable": nextPageAvailable}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching news: {str(e)}")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request, page: int = Query(1, ge=1)):
    news_list = scrape_google_news(["전기차"], page=page)
    return templates.TemplateResponse("index.html", {"request": request, "news_list": news_list})

# 댓글 API
@app.post("/comments/", response_model=Comment)
async def add_comment(comment: Comment):
    logger = logging.getLogger("uvicorn")
    logger.info(f"Adding a new comment: {comment}")
    # news_id를 문자열로 변환하여 저장
    comment.news_id = str(comment.news_id)  # UUID를 문자열로 변환
    comment.id = len(comments_db) + 1
    comments_db.append(comment.dict())
    logger.info(f"Comment added successfully: {comment}")
    return comment

@app.get("/comments/{news_id}", response_model=List[Comment])
async def get_comments(news_id: str):
    logger = logging.getLogger("uvicorn")
    logger.info(f"Fetching comments for news_id: {news_id}")
    # news_id 비교 시 모두 문자열로 처리
    filtered_comments = [Comment(**comment) for comment in comments_db if comment['news_id'] == news_id]
    logger.info(f"Comments fetched successfully for news_id {news_id}: {filtered_comments}")
    return filtered_comments

@app.post("/comments/vote")
async def vote_comment(vote_data: CommentVote):
    # Locate the comment by ID
    comment_id = vote_data.comment_id
    comment = next((c for c in comments_db if c['id'] == comment_id), None)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # Update the vote counts
    if vote_data.vote_type == "upvote":
        comment[comment_id] = comment.get('upvotes', 0) + 1
    elif vote_data.vote_type == "downvote":
        comment['downvotes'] = comment.get('downvotes', 0) + 1
    
    # Return updated comment
    return comment

# Vote API
@app.post("/vote/{news_id}")
async def vote(news_id: str, vote_data: Vote):
    # UUID를 문자열로 처리하므로, news_id의 타입을 int에서 str로 변경
    if news_id not in votes:
        # 실제 애플리케이션에서는 여기에서 뉴스 아이템의 존재 여부를 검증해야 함
        if not await news_exists(news_id):
            raise HTTPException(status_code=404, detail="News item not found")
        votes[news_id] = {"upvotes": 0, "downvotes": 0}
    if vote_data.vote_type == "upvote":
        votes[news_id]["upvotes"] += 1
    elif vote_data.vote_type == "downvote":
        votes[news_id]["downvotes"] += 1
    else:
        raise HTTPException(status_code=400, detail="Invalid vote type")
    return {"news_id": news_id, "votes": votes[news_id]}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
