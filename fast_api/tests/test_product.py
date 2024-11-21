# tests/test_product.py
from .mock_fixtures import create_product_in_db
from .api_fixtures import client


class ResponseValidator:
    """Класс для валидации API-ответов с моделями из базы данных."""

    @staticmethod
    def validate_fields(api_data, model_data, fields):
        """Сравнивает поля API-ответа с моделью."""
        mismatches = []
        for field in fields:
            api_value = api_data.get(field)
            model_value = getattr(model_data, field, None)
            if api_value != model_value:
                mismatches.append(
                    f"Field '{field}' mismatch: API value '{api_value}' != Model value '{model_value}'"
                )
        if mismatches:
            raise AssertionError("\n".join(mismatches))

    @staticmethod
    def validate_nested_list(api_list, model_list, key_mappings):
        """Сравнивает списки объектов (например, магазины) между API и моделью."""
        if len(api_list) != len(model_list):
            raise AssertionError(
                f"List length mismatch: API has {len(api_list)} items, Model has {len(model_list)} items"
            )
        for api_item, model_item in zip(api_list, model_list):
            mismatches = []
            for api_key, model_attr in key_mappings.items():
                api_value = api_item.get(api_key)
                model_value = getattr(model_item, model_attr, None)
                if api_value != model_value:
                    mismatches.append(
                        f"Mismatch in nested field '{api_key}': API value '{api_value}' != Model value '{model_value}'"
                    )
            if mismatches:
                raise AssertionError("\n".join(mismatches))


def test_get_products(client, create_product_in_db):
    # 1. Запрос продуктов через API
    response = client.get("/products/")
    assert response.status_code == 200, "Failed to fetch products"
    products = response.json()

    # 2. Ищем продукт по ID
    local_product = create_product_in_db
    product = next((p for p in products if p["id"] == local_product.id), None)
    assert product is not None, f"Product with ID {local_product.id} not found in API response"

    # 3. Проверяем основные поля продукта
    fields_to_check = ["name", "description", "price", "quantity", "status", "category_id"]
    ResponseValidator.validate_fields(product, local_product, fields_to_check)

    # 4. Проверяем вложенные магазины
    key_mappings = {"id": "id", "name": "name"}
    ResponseValidator.validate_nested_list(product["stores"], local_product.stores, key_mappings)


def test_create_product(client, dict_product_mock, object_product_mock):
    # 1. Запрос на создание продуктов через API
    response = client.post("/products/", json=dict_product_mock)

    assert response.status_code == 201, f"Failed to create product: {response.json()}"

    created_product = response.json()

    # 2. Проверяем, что данные продукта совпадают с отправленными
    fields_to_check = ["name", "description", "price", "quantity", "status", "category_id"]
    ResponseValidator.validate_fields(created_product, object_product_mock, fields_to_check)

    # 3. Проверяем связанные магазины
    key_mappings = {"id": "id", "name": "name"}
    ResponseValidator.validate_nested_list(created_product["stores"], object_product_mock.stores, key_mappings)
