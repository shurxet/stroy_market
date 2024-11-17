# fast_api/app/core/config.py
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
