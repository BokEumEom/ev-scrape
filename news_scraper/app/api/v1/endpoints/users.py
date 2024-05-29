# app/api/v1/endpoints/users.py
import os
from fastapi import APIRouter, Depends, HTTPException, status, Body, Request
from fastapi.responses import RedirectResponse, JSONResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, AsyncGenerator
from app import schemas
from app.crud import users as crud
from app.config import get_logger
from app.database import SessionLocal
from aiohttp import ClientSession
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.core.security import create_access_token, verify_access_token, get_current_user
from datetime import timedelta, timezone
from fastapi_login import LoginManager
from app.core.config import settings

logger = get_logger()

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise e
        finally:
            await session.close()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_REDIRECT_URI = os.getenv("GITHUB_REDIRECT_URI")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/users/login")

manager = LoginManager(settings.SECRET_KEY, token_url="/api/v1/users/login")

@manager.user_loader
async def load_user(email: str, db: AsyncSession = Depends(get_db)):
    return await crud.get_user_by_email(db, email)

class GitHubUser(schemas.UserBase):
    pass

@router.post("/signup", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await crud.create_user(db, user)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud.get_user_by_email(db, form_data.username)
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Successfully logged out"}

@router.get("/profile", response_model=schemas.User)
async def get_profile(current_user: schemas.User = Depends(get_current_user)):
    return current_user

@router.get("/auth/github")
def github_login():
    github_authorize_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        f"&redirect_uri={GITHUB_REDIRECT_URI}"
        "&scope=read:user user:email"
    )
    return RedirectResponse(github_authorize_url)

@router.get("/auth/github/callback")
async def github_callback(code: str, db: AsyncSession = Depends(get_db)):
    async with ClientSession() as session:
        token_url = "https://github.com/login/oauth/access_token"
        token_data = {
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": GITHUB_REDIRECT_URI,
        }
        headers = {"Accept": "application/json"}
        async with session.post(token_url, data=token_data, headers=headers) as response:
            token_json = await response.json()
            access_token = token_json.get("access_token")
            if not access_token:
                raise HTTPException(status_code=400, detail="Failed to get access token")

        user_url = "https://api.github.com/user"
        user_emails_url = "https://api.github.com/user/emails"
        headers = {"Authorization": f"Bearer {access_token}"}

        async with session.get(user_url, headers=headers) as response:
            user_data = await response.json()
            username = user_data.get("login")

        async with session.get(user_emails_url, headers=headers) as response:
            emails_data = await response.json()
            primary_email = next(
                (email["email"] for email in emails_data if email["primary"]), None
            )

        if not primary_email:
            raise HTTPException(status_code=400, detail="Email not found")

        user_in_db = await crud.get_user_by_email(db, primary_email)
        if not user_in_db:
            user_in = schemas.UserCreate(username=username, email=primary_email, password="github")
            user_in_db = await crud.create_user(db, user_in)

        user = GitHubUser(username=user_in_db.username, email=user_in_db.email)
        return user

@router.get("/{user_id}", response_model=schemas.User)
async def read_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/", response_model=List[schemas.User])
async def read_all_users(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    users = await crud.get_users(db, skip=skip, limit=limit)
    return users
