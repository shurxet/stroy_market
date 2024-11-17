# fast_api/app/api/__init__.py
from fastapi import APIRouter
from .product import router as product_router
from .category import router as category_router
from .store import router as store_router

api_router = APIRouter()
api_router.include_router(product_router, prefix="/products", tags=["products"])
api_router.include_router(category_router, prefix="/categories", tags=["categories"])
api_router.include_router(store_router, prefix="/stores", tags=["stores"])
