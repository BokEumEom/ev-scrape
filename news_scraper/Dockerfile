# https://hub.docker.com/_/python
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Install Playwright browsers
RUN playwright install-deps

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]