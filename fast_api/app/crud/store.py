# fast_api/app/crud/store.py
from typing import Type
from sqlalchemy.orm import Session
from app.models.store import Store
from app.schemas.store import StoreCreate, StoreUpdate
from fastapi import HTTPException, status


def get_stores(db: Session, skip: int = 0, limit: int = 10) -> list[Type[Store]]:
    db_stores = db.query(Store).offset(skip).limit(limit).all()

    return db_stores


def get_store(db: Session, store_id: int) -> Store:
    db_store = db.query(Store).filter(Store.id == store_id).first()
    if not db_store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store with id {store_id} not found"
        )

    return db_store


def create_store(db: Session, store: StoreCreate):
    db_store = Store(**store.dict(exclude={"store_ids"}))
    db.add(db_store)
    db.commit()
    db.refresh(db_store)
    return db_store


def update_store(db: Session, store_id: int, store: StoreUpdate):
    db_store = db.query(Store).filter(Store.id == store_id).first()

    if not db_store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store with id {store_id} not found"
        )

    # Обновляем поля магазина
    update_data = store.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_store, key, value)

    # Сохраняем изменения
    db.commit()
    db.refresh(db_store)

    return db_store


def delete_store(db: Session, store_id: int):
    db_store = db.query(Store).filter(Store.id == store_id).first()

    if not db_store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store with id {store_id} not found"
        )

    db.delete(db_store)
    db.commit()

    return db_store
