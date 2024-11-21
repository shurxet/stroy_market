# tests/conftest.py

from .db_fixtures import test_db_engine, test_db_session
from .api_fixtures import client
from .docker_fixtures import start_postgres_container
from .mock_fixtures import (
    create_category_in_db,
    create_store_in_db,
    create_product_in_db,
    dict_product_mock,
    object_product_mock
)
