# app/models/vote.py
from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Vote(Base):
    __tablename__ = "votes"
    
    id = Column(Integer, primary_key=True, index=True)
    vote_type = Column(String, nullable=False)