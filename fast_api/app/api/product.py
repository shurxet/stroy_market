# fast_api/app/api/product.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
from app.schemas.product import Product, ProductCreate, ProductUpdate, ProductResponse
from app.crud.product import create_product, get_products, get_product, update_product, delete_product
from app.core.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Product])
def get_products_endpoint(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category_id: int = None,
    store_id: int = None,
    min_price: float = None,
    max_price: float = None,
):
    """
    Получить список продуктов с опциональной фильтрацией по:
    - category_id: Фильтрация по ID категории.
    - shop_id: Фильтрация по ID магазина.
    - min_price: Минимальная цена продукта.
    - max_price: Максимальная цена продукта.
    - skip: Количество пропусков для пагинации.
    - limit: Лимит количества возвращаемых продуктов.
    """
    products = get_products(
        db=db,
        skip=skip,
        limit=limit,
        category_id=category_id,
        store_id=store_id,
        min_price=min_price,
        max_price=max_price,
    )
    return products


@router.get("/{product_id}", response_model=Product)
def get_product_endpoint(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db=db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=Product)
def create_product_endpoint(product: ProductCreate, db: Session = Depends(get_db)):
    response = create_product(db=db, product_data=product)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=ProductResponse.from_orm(response).dict()
    )


@router.put("/{product_id}", response_model=Product)
def update_product_endpoint(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    updated_product = update_product(db=db, product_id=product_id, product=product)
    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


@router.delete("/{product_id}", response_model=Product)
def delete_product_endpoint(product_id: int, db: Session = Depends(get_db)):
    deleted_product = delete_product(db=db, product_id=product_id)
    if deleted_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return deleted_product
