# fast_api/app/models/store.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .product_store import product_store
from ..core.database import Base


class Store(Base):
    __tablename__ = 'stores'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    products = relationship('Product', secondary=product_store, back_populates='stores')
