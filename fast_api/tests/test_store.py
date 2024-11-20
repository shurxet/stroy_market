# tests/test_category.py
from .mock_fixtures import create_store_in_db
from .api_fixtures import client


def test_get_stores(client, create_store_in_db):
    response = client.get("/stores/")

    assert response.status_code == 200
    stores = response.json()
    assert create_store_in_db.name in [store["name"] for store in stores]


def test_get_store(client, create_store_in_db):
    response = client.get(f"/stores/{create_store_in_db.id}")

    assert response.status_code == 200
    assert response.json()["name"] == create_store_in_db.name
    assert response.json()["id"] == create_store_in_db.id


def test_create_store(client, create_store_in_db):
    store = {
        "name": "Test Store",
    }

    response = client.post("/stores/", json={"name": store["name"]})

    assert response.status_code == 201
    assert response.json()["name"] == store["name"]


def test_update_store(client, create_store_in_db):
    updated_name = "Updated Store Name"

    response = client.put(f"/stores/{create_store_in_db.id}", json={"name": updated_name})

    assert response.status_code == 200

    assert response.json()["name"] == updated_name


def test_delete_category(client, create_store_in_db):
    response = client.delete(f"/stores/{create_store_in_db.id}")

    assert response.status_code == 204

    response = client.get("/stores/")
    stores = response.json()
    assert create_store_in_db.name not in [store["name"] for store in stores]
