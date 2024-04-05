# 기본 이미지 설정
FROM mcr.microsoft.com/playwright/python:v1.42.0-jammy

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# python3-venv 패키지 설치
USER root
RUN apt-get update && \
    apt-get install -y python3.10-venv --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Python 가상 환경 설정 (필요한 경우)
ENV VENV=$APP_HOME/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . ./

# 기본 실행 명령 설정
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
