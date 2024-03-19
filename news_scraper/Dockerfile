# 첫 번째 단계: 빌드 이미지
# Microsoft의 공식 Playwright Python 이미지를 사용
FROM mcr.microsoft.com/playwright/python:v1.42.0-jammy AS builder

# 작업 디렉토리 설정
ENV APP_HOME /app
WORKDIR $APP_HOME

# Python 가상 환경 설정
ENV VENV=/app/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . ./

# 두 번째 단계: 최종 이미지
FROM mcr.microsoft.com/playwright/python:v1.42.0-jammy

# 작업 디렉토리 및 환경 변수 설정
ENV APP_HOME /app
WORKDIR $APP_HOME
ENV PATH="$APP_HOME/venv/bin:$PATH"

# 첫 번째 단계에서 빌드한 가상 환경과 애플리케이션 코드 복사
COPY --from=builder /app /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
