# First stage: build the application with all dependencies and playwright browsers
FROM python:3.10-slim-bullseye AS builder

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Set the Playwright cache location to app directory
ENV PLAYWRIGHT_BROWSERS_PATH $APP_HOME/.cache/ms-playwright

# Create a virtual environment and add it to the PATH
ENV VENV=$APP_HOME/venv
RUN python -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install Playwright and browser dependencies
RUN playwright install --with-deps

# Copy application code to container
COPY . ./

# Second stage: create the final runtime image
FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED True
ENV APP_HOME /app
WORKDIR $APP_HOME

# Copy the virtual environment from the builder stage
COPY --from=builder $APP_HOME $APP_HOME

# Make sure scripts in .venv are usable:
ENV PATH="$APP_HOME/venv/bin:$PATH"
ENV PLAYWRIGHT_BROWSERS_PATH $APP_HOME/.cache/ms-playwright

# Start the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
