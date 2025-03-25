# 빌드 스테이지: 의존성 설치
FROM python:3.10-slim AS builder

WORKDIR /build

# 필요한 시스템 패키지 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir python-multipart

# 실행 스테이지: 필요한 파일만 복사
FROM python:3.10-slim

# 환경 변수 설정
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
WORKDIR $APP_HOME

# 빌더 스테이지에서 설치된 Python 패키지 복사
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 필요한 시스템 패키지 설치 및 Playwright 설정
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    # Playwright 및 Chromium 설치
    && pip install --no-cache-dir playwright \
    && playwright install --with-deps chromium \
    # 확인 단계: 설치 확인
    && ls -la $PLAYWRIGHT_BROWSERS_PATH

# 애플리케이션 코드 복사
COPY . .

# 보안 강화: 사용자 생성 및 권한 설정
RUN groupadd -r appuser && useradd -r -g appuser appuser \
    && chown -R appuser:appuser $APP_HOME \
    # Playwright 브라우저 디렉토리에 적절한 권한 부여
    && chown -R appuser:appuser $PLAYWRIGHT_BROWSERS_PATH

USER appuser

# 실행 명령어
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
