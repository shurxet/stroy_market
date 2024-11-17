# fast_api/app/schemas/product.py
from typing import Optional, List
from pydantic import BaseModel
from app.schemas.store import Store


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    quantity: int = 0
    status: str


class ProductCreate(ProductBase):
    category_id: int
    stores: List[int]


class ProductUpdate(ProductBase):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    quantity: int = 0
    status: str
    stores: Optional[List[Store]] = None  # Здесь список объектов магазинов


class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None  # Сделано опциональным
    price: float
    category_id: Optional[int] = None  # Сделано опциональным
    quantity: int = 0
    status: str
    stores: List[Store]  # Добавляем поле для производителей

    class Config:
        from_attributes = True
