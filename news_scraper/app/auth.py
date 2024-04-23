from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # 토큰을 검증하고 사용자 정보를 가져오는 로직 구현
    user = await User.get_by_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user