# fast_api/app/models/__init__.py

from app.core.database import Base  # Импортируем Base из database.py

# Импортируем все модели, чтобы Alembic мог их обнаружить
from .category import Category
from .product import Product
from .store import Store
from .product_store import product_store
