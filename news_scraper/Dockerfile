# 첫 번째 단계: 빌드 이미지
FROM python:3.10-slim-bullseye AS builder

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Python 가상 환경 설정
ENV VENV=/app/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# 의존성 설치
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Playwright 및 필요한 브라우저 바이너리 설치
# 예시로, Google Chrome만 설치하는 경우:
RUN pip install playwright
RUN playwright install
RUN playwright install-deps

# 애플리케이션 코드 복사
COPY . ./

# 두 번째 단계: 최종 이미지
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# 첫 번째 단계에서 빌드한 가상 환경 복사
COPY --from=builder /app /app

ENV PATH="$APP_HOME/venv/bin:$PATH"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
