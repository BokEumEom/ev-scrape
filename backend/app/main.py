from fastapi import FastAPI, Depends, HTTPException
from typing import List

# 데이터베이스 설정 및 세션 관리
from backend.database.database import SessionLocal, engine, Base
from sqlalchemy.orm import Session

# 모델과 스키마
import models, schemas

# 비즈니스 로직이 담긴 CRUD 연산
import crud

# 데이터베이스 모델(Base)을 이용해 테이블 생성 (이미 존재한다면 무시)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
