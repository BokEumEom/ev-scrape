# app/api/v1/endpoints/community_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, AsyncGenerator
from app import crud, schemas
from app.database import SessionLocal

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.get("", response_model=schemas.CommunityPostsResponse)
async def read_community_posts(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    posts_with_counts, total_count = await crud.get_community_posts_with_count(db, skip=skip, limit=limit)

    return {'items': posts_with_counts, 'total': total_count}

@router.get("/{post_id}", response_model=schemas.CommunityPost)
async def read_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    try:
        post = await crud.get_community_post(db, post_id)
        if post is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        
        # Get like and comment counts
        like_count = await crud.get_like_count(db, post_id)
        comment_count = await crud.get_comment_count(db, post_id)

        # Convert ORM model to dict and add counts
        post_data = jsonable_encoder(post)
        post_data['likeCount'] = like_count
        post_data['commentCount'] = comment_count
        
        return post_data
    except SQLAlchemyError as e:
        # 데이터베이스 연결 실패 또는 쿼리 실패 시
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database connection error")
    except Exception as e:
        # 기타 모든 예외를 처리
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("", response_model=schemas.CommunityPost)
async def create_community_post(post: schemas.CommunityPostCreate, db: AsyncSession = Depends(get_db)):
    try:
        created_post = await crud.create_community_post(db, post)
        return created_post
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=f"Failed to create post: {str(e)}")

@router.put("/{post_id}", response_model=schemas.CommunityPost)
async def update_community_post(post_id: int, post: schemas.CommunityPostCreate, db: AsyncSession = Depends(get_db)):
    try:
        # SQLAlchemy의 컨텍스트 관리자를 사용하여 트랜잭션을 처리합니다.
        async with db.begin():
            updated_post = await crud.update_community_post(db, post_id, post)
            if not updated_post:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
            return updated_post
    except IntegrityError as e:
        # 데이터 무결성 오류 처리
        await db.rollback()  # 명시적 롤백
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e.orig))
    except SQLAlchemyError as e:
        # 기타 SQL 오류 처리
        await db.rollback()  # 명시적 롤백
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database connection error")
    except Exception as e:
        # 예상치 못한 오류 처리
        await db.rollback()  # 명시적 롤백
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/{post_id}", response_model=schemas.CommunityPost)
async def delete_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    try:
        return await crud.delete_community_post(db, post_id)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database connection error")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/{post_id}/like", response_model=schemas.CommunityPost)
async def like_community_post(post_id: int, db: AsyncSession = Depends(get_db)):
    try:
        post = await crud.like_community_post(db, post_id)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return post
    except SQLAlchemyError as e:
        print(f"Database error occurred: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable due to database error")
    except Exception as e:
        print(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{post_id}/comments", response_model=schemas.Comment)
async def create_comment(post_id: int, comment: schemas.CommentCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await crud.create_comment(db, post_id, comment)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=f"Database connection error: {str(e)}")

@router.get("/{post_id}/comments", response_model=List[schemas.Comment])
async def read_comments(post_id: int, db: AsyncSession = Depends(get_db)):
    try:
        comments = await crud.get_comments_by_post_id(db, post_id)
        return comments
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database connection error")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/comments/{comment_id}", response_model=schemas.Comment)
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    try:
        deleted_comment = await crud.delete_comment(db, comment_id)
        if not deleted_comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        return deleted_comment
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database connection error")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))