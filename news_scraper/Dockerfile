# https://hub.docker.com/_/python
# Use Python 3.10 slim image based on Debian Bullseye as the base image
# Use Python 3.10 slim image based on Debian Bullseye as the base image
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
ENV VENV /app/venv
WORKDIR $APP_HOME

# Create and activate virtual environment
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# Copy the application files to the container
COPY . ./

# Update pip and Install dependencies in the virtual environment
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN playwright install

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


