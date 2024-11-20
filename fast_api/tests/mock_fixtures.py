# tests/mock_fixtures.py
import pytest
from faker import Faker
from app.models import Category, Store


# Фикстура для создания категории в базе данных
@pytest.fixture
def create_category_in_db(test_db_session):
    fake = Faker()
    category_data = {
        "name": fake.unique.company()
    }
    category = Category(name=category_data["name"])
    test_db_session.add(category)
    test_db_session.commit()
    test_db_session.refresh(category)
    return category


@pytest.fixture
def create_store_in_db(test_db_session):
    fake = Faker()
    store_data = {
        "name": fake.unique.company()
    }
    store = Store(name=store_data["name"])
    test_db_session.add(store)
    test_db_session.commit()
    test_db_session.refresh(store)
    return store


# # Фикстура для получения списка категорий (имитация реальных данных)
# @pytest.fixture
# def mock_categories_list(test_db_session):
#     fake = Faker()
#     category_data = {
#         "name": fake.unique.company()
#     }
#     categories = [
#         Category(name=category_data["name"]),
#         Category(name=category_data["name"]),
#         Category(name=category_data["name"])
#     ]
#     test_db_session.add_all(categories)
#     test_db_session.commit()
#     return categories
