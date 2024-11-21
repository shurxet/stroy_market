# tests/mock_fixtures.py
import pytest
from faker import Faker
from app.models import Category, Store, Product


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


@pytest.fixture
def create_product_in_db(test_db_session, create_category_in_db, create_store_in_db):
    fake = Faker()

    # Создаем категорию и магазин
    category = create_category_in_db
    store = create_store_in_db

    # Создаем данные для продукта
    product_data = {
        "name": fake.unique.word(),
        "description": fake.text(),
        "price": round(fake.pyfloat(left_digits=3, right_digits=2, positive=True), 2),
        "category_id": category.id,
        "quantity": fake.random_int(min=1, max=100),
        "status": fake.random_element(["в наличии", "нет в наличии"]),
    }

    # Создаем продукт и добавляем его в сессию
    product = Product(
        name=product_data["name"],
        description=product_data["description"],
        price=product_data["price"],
        category_id=product_data["category_id"],
        quantity=product_data["quantity"],
        status=product_data["status"],
    )

    test_db_session.add(product)
    test_db_session.commit()
    test_db_session.refresh(product)

    # Привязываем продукт к магазину
    product.stores.append(store)
    test_db_session.commit()
    test_db_session.refresh(product)

    return product


@pytest.fixture
def dict_product_mock(test_db_session, create_category_in_db, create_store_in_db):
    fake = Faker()

    # 1. Создаем данные для нового продукта
    category = create_category_in_db
    store = create_store_in_db
    product_data = {
        "name": fake.unique.word(),
        "description": fake.text(),
        "price": round(fake.pyfloat(left_digits=3, right_digits=2, positive=True), 2),
        "quantity": fake.random_int(min=1, max=100),
        "status": fake.random_element(["в наличии", "нет в наличии"]),
        "category_id": category.id,
        "stores": [store.id],
    }

    return product_data


@pytest.fixture
def object_product_mock(test_db_session, dict_product_mock, create_store_in_db):
    store = create_store_in_db

    # Преобразуем словарь в объект модели
    product_obj = Product(
        name=dict_product_mock["name"],
        description=dict_product_mock["description"],
        price=dict_product_mock["price"],
        quantity=dict_product_mock["quantity"],
        status=dict_product_mock["status"],
        category_id=dict_product_mock["category_id"],
    )

    product_obj.stores.append(store)

    return product_obj
