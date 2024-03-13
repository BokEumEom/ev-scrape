# https://hub.docker.com/_/python
# Use Python 3.10 slim image based on Debian Bullseye as the base image
FROM python:3.12-bookworm

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

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
    playwright install --with-deps

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]