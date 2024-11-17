# fast_api/app/models/product_store.py
from sqlalchemy import Table, Column, Integer, ForeignKey
from ..core.database import Base


# Association table for many-to-many relationship between products and manufacturers
product_store = Table(
    'product_store',
    Base.metadata,
    Column('product_id', Integer, ForeignKey('products.id'), primary_key=True),
    Column('store_id', Integer, ForeignKey('stores.id'), primary_key=True)
)