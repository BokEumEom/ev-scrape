# 첫 번째 단계: 빌드 이미지
FROM python:3.10-slim-bullseye AS builder

# 작업 디렉토리 설정
ENV APP_HOME /app
WORKDIR $APP_HOME

# python3-venv 패키지 설치
RUN apt-get update && \
    apt-get install -y python3.10-venv && \
    rm -rf /var/lib/apt/lists/*

# Python 가상 환경 설정
ENV VENV=/app/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# 의존성 설치
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Playwright 및 필요한 브라우저 바이너리 설치 위치를 앱 디렉토리로 지정
ENV PLAYWRIGHT_BROWSERS_PATH=$APP_HOME/.cache/ms-playwright

# Playwright 및 필요한 브라우저 바이너리 설치
RUN pip install playwright
RUN playwright install --with-deps

# 애플리케이션 코드 복사
COPY . ./

# 두 번째 단계: 최종 이미지
FROM python:3.10-slim-bullseye

# 작업 디렉토리 및 환경 변수 설정
ENV APP_HOME /app
WORKDIR $APP_HOME
ENV PATH="$APP_HOME/venv/bin:$PATH"

# 첫 번째 단계에서 빌드한 가상 환경과 애플리케이션 코드 복사
COPY --from=builder /app /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
