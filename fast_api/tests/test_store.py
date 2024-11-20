# tests/test_category.py
from .mock_fixtures import create_store_in_db
from .api_fixtures import client


def test_get_stores(client, create_store_in_db):
    # Получаем список категорий через API
    response = client.get("/stores/")

    # Проверка, что категория присутствует в списке
    assert response.status_code == 200
    stores = response.json()
    assert create_store_in_db.name in [store["name"] for store in stores]


def test_create_store(client, create_store_in_db):
    # Получаем данные созданной категории
    # store = create_store_in_db
    store = {
        "name": "Test Store",
    }

    # Запрос на создание категории
    response = client.post("/stores/", json={"name": store["name"]})

    # Проверка, что категория была успешно создана
    assert response.status_code == 201
    assert response.json()["name"] == store["name"]
