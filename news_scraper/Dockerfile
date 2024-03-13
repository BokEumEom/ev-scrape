# https://hub.docker.com/_/python
# Use Python 3.10 slim image based on Debian Bullseye as the base image
FROM python:3.10-slim-bullseye as builder

# Set environment variables
ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Copy the application files to the container
COPY . ./

# Install system dependencies required by Playwright
# and Python dependencies in one RUN command to reduce the number of layers
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && pip install --no-cache-dir --upgrade pip \
    && pip install playwright \
    && playwright install \
    && playwright install-deps \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false wget \
    && rm -rf /var/lib/apt/lists/*

# Use a slim image for the final build to minimize the image size
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Copy the application files from the builder image
COPY --from=builder $APP_HOME $APP_HOME

# The command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
