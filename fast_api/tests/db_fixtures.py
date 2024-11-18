# tests/db_fixtures.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base


@pytest.fixture(scope="session")
def test_db_engine():
    # Подключение к тестовой базе PostgreSQL
    test_database_url = "postgresql://user:password@localhost:5432/dbname"
    engine = create_engine(test_database_url)
    Base.metadata.create_all(bind=engine)  # Создаем таблицы для тестов
    yield engine
    Base.metadata.drop_all(bind=engine)  # Удаляем таблицы после тестов


@pytest.fixture(scope="function")
def test_db_session(test_db_engine):
    # Создание сессии для взаимодействия с тестовой базой
    Session = sessionmaker(autocommit=False, autoflush=False, bind=test_db_engine)
    session = Session()
    yield session
    session.close()
