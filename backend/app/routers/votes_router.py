# votes_router.py
from fastapi import APIRouter, HTTPException, Body, Path
from typing import Dict, Any

router = APIRouter()

votes: Dict[str, Dict[str, int]] = {}  # Simulating an in-memory store for votes

@router.post("/api/v1/vote/{news_id}")
async def vote(news_id: str, vote_type: str = Body(..., embed=True)) -> Dict[str, Any]:
    if news_id not in votes:
        votes[news_id] = {"upvotes": 0, "downvotes": 0}
    if vote_type == "upvote":
        votes[news_id]["upvotes"] += 1
    elif vote_type == "downvote":
        votes[news_id]["downvotes"] += 1
    else:
        raise HTTPException(status_code=400, detail="Invalid vote type")
    return {"news_id": news_id, "votes": votes[news_id]}
