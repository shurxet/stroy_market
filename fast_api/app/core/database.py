# fast_api/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from .config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Функция для инициализации базы данных
def init_db():
    Base.metadata.create_all(bind=engine)


# from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
# from sqlalchemy.orm import sessionmaker
# from app.core.config import settings
#
# from sqlalchemy.ext.declarative import declarative_base
#
# SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
#
# # Создание асинхронного движка
# engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)
#
# # Создание асинхронной сессии
# AsyncSessionLocal = sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
# )
#
# Base = declarative_base()
#
#
# # Функция для получения сессии
# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session
#
#
# def init_db():
#     Base.metadata.create_all(bind=engine)
