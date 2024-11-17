from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_product():
    response = client.post(
        "/products/",
        json={
            "name": "Test Product",
            "description": "A test product",
            "price": 99.99,
            "quantity": 10,
            "status": "в наличии",
            "category_id": 1,
            "manufacturer_ids": [1, 2]
        }
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test Product"
