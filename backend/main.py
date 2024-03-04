# main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import crud
from app.schemas.schemas import NewsCreate, News
from typing import List
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/news/", response_model=News)
def create_news(news_create: NewsCreate, db: Session = Depends(get_db)):
    return crud.create_news(db=db, news_create=news_create)

@app.get("/news/", response_model=List[News])
def read_news(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    news = crud.get_news(db, skip=skip, limit=limit)
    return news
