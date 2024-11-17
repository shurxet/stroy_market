# fast_api/app/schemas/category.py
from pydantic import BaseModel
from typing import List

from app.schemas.product import Product


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class Category(BaseModel):
    id: int
    name: str
    products: List[Product] = []

    class Config:
        from_attributes = True  # В Pydantic V2 заменяем orm_mode
