import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "JSD Group API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = Field(default="sqlite:///./jsd_group.db")
    
    # JWT
    JWT_SECRET: str = Field(default="jsd-group-production-super-secret-key-2026-secure")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # AI Assistant (Jeesa AI)
    AI_API_KEY: str = Field(default="")
    AI_PROVIDER: str = Field(default="gemini") # "gemini", "openai", "local_rag"
    AI_MODEL: str = Field(default="gemini-1.5-flash")
    AI_RATE_LIMIT_PER_MINUTE: int = 30
    AI_VERIFIED_ONLY_DEFAULT: bool = True
    
    # Email / SMTP
    SMTP_HOST: str = Field(default="")
    SMTP_PORT: int = Field(default=587)
    SMTP_USERNAME: str = Field(default="")
    SMTP_PASSWORD: str = Field(default="")
    ADMIN_EMAIL: str = Field(default="jibanchy233@gmail.com")
    
    # URLs & CORS
    NEXT_PUBLIC_SITE_URL: str = Field(default="http://localhost:3000")
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]
    
    # Storage
    UPLOAD_DIR: str = "uploads"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"

settings = Settings()
