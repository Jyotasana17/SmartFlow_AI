from functools import lru_cache
from typing import Literal

from pydantic import AnyHttpUrl, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="SMARTFLOW_",
        env_file=("backend/.env", "backend/.env.example"),
        extra="ignore",
    )

    env: Literal["development", "staging", "production", "test"] = "development"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    jwt_secret: str = Field(default="change-me-in-production", min_length=16)
    jwt_issuer: str = "smartflow-ai"
    access_token_minutes: int = 30
    refresh_token_days: int = 7
    postgres_dsn: str = "postgresql+asyncpg://smartflow:smartflow@localhost:5432/smartflow"
    redis_url: str = "redis://localhost:6379/0"
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db: str = "smartflow"
    event_bus: Literal["redis", "memory"] = "memory"
    yolo_model: str = "yolov8n.pt"
    enable_real_model: bool = False
    cors_origins: list[str | AnyHttpUrl] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
