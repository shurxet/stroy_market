# tests/api_fixtures.py
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal


@pytest.fixture(scope="function")  # Меняем на "function"
def client(test_db_session):
    """Фикстура для клиента"""
    # Создаем тестового клиента для API
    def override_get_db():
        try:
            yield test_db_session
        finally:
            test_db_session.close()

    app.dependency_overrides[SessionLocal] = override_get_db
    client = TestClient(app)
    yield client
    del app.dependency_overrides[SessionLocal]
