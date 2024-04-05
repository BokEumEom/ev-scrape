# mcr.microsoft.com/playwright/python 이미지를 사용하는 Dockerfile
FROM mcr.microsoft.com/playwright/python:v1.42.0-jammy

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Python 가상 환경 설정 (필요에 따라)
ENV VENV=$APP_HOME/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# 의존성 파일 복사
COPY requirements.txt .

# Python 의존성 설치
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . ./

# 필요한 Playwright 브라우저 설치
# 이미지에 Playwright가 포함되어 있으므로, playwright install-deps는 시스템 종속성을 설치합니다.
# 이 단계는 시스템 종속성이 필요한 경우에만 필요합니다.
RUN playwright install-deps

# 기본 실행 명령 설정
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
