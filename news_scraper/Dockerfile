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
RUN pip install --no-cache-dir -r requirements.txt

# 실행 스테이지: 필요한 파일만 복사
FROM python:3.10-slim

# 환경 변수 설정
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app
WORKDIR $APP_HOME

# 빌더 스테이지에서 설치된 Python 패키지 복사
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 필요한 시스템 패키지만 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Playwright와 Chromium만 설치 (다른 브라우저 제외)
RUN pip install playwright && \
    python -m playwright install chromium --with-deps && \
    rm -rf ~/.cache

# 애플리케이션 코드 복사
COPY . .

# 보안 강화
RUN groupadd -r appuser && useradd -r -g appuser appuser && \
    chown -R appuser:appuser $APP_HOME

USER appuser

# 실행 명령어 - 전체 경로 지정
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
