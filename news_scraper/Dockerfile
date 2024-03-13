# https://hub.docker.com/_/python
# Use Python 3.10 slim image based on Debian Bullseye as the base image
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Install necessary system dependencies for Playwright
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libnss3 \
    libnspr4 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libatspi2.0-0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libxcb1 \
    libxkbcommon0 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the application files to the container
COPY . ./

# Use virtual environment
ENV VENV=/app/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# Upgrade pip in the virtual environment and install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install Playwright and browser binaries
RUN pip install playwright && \
    playwright install

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]