# /app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./database.db"  # Default SQLite database
    logging_level: str = "INFO"  # Default logging level

    class Config:
        env_file = ".env"  # Specifies that configuration should be loaded from .env file

# Initialize the Settings class without passing extra values
settings = Settings()
