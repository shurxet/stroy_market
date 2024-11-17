# fast_api/app/crud/store.py
from typing import Type

from sqlalchemy.orm import Session
from app.models.store import Store
from app.schemas.store import StoreCreate


# CRUD для магазинов

def get_store(db: Session, skip: int = 0, limit: int = 10) -> list[Type[Store]]:
    return db.query(Store).offset(skip).limit(limit).all()  # Получаем категории с возможностью пагинации


def create_store(db: Session, store: StoreCreate):
    db_store = Store(**store.dict(exclude={"store_ids"}))
    db.add(db_store)
    db.commit()
    db.refresh(db_store)

    # # Handle shops
    # if shop.shop_ids:
    #     shops = db.query(Shop).filter(Shop.id.in_(product.shop_ids)).all()
    #     db_product.shops.extend(shops)
    #     db.commit()

    return db_store
