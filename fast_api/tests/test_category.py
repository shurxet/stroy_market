# tests/test_category.py
from .mock_fixtures import create_category_in_db
from .api_fixtures import client


def test_get_categories(client, create_category_in_db):
    # Получаем список категорий через API
    response = client.get("/categories/")

    # Проверка, что категория присутствует в списке
    assert response.status_code == 200
    categories = response.json()
    assert create_category_in_db.name in [category["name"] for category in categories]


def test_get_category(client, create_category_in_db):
    response = client.get(f"/categories/{create_category_in_db.id}")

    assert response.status_code == 200
    assert response.json()["name"] == create_category_in_db.name
    assert response.json()["id"] == create_category_in_db.id


def test_create_category(client, create_category_in_db):
    # Получаем данные созданной категории
    category = create_category_in_db

    # Запрос на создание категории
    response = client.post("/categories/", json={"name": category.name})

    # Проверка, что категория была успешно создана
    assert response.status_code == 201
    assert response.json()["name"] == category.name


def test_update_category(client, create_category_in_db):
    updated_name = "Updated Category Name"

    # Запрос на обновление категории
    response = client.put(f"/categories/{create_category_in_db.id}", json={"name": updated_name})

    # Проверка, что статус ответа 200
    assert response.status_code == 200

    # Проверка, что имя категории было обновлено
    assert response.json()["name"] == updated_name


def test_delete_category(client, create_category_in_db):
    # Запрос на удаление категории
    response = client.delete(f"/categories/{create_category_in_db.id}")

    # Проверка, что статус ответа 204 (успешное удаление без контента)
    assert response.status_code == 204

    # Проверка, что категория была удалена
    response = client.get("/categories/")
    categories = response.json()
    assert create_category_in_db.name not in [category["name"] for category in categories]
