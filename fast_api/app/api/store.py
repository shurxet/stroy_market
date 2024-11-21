# fast_api/app/api/store.py
from typing import List
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.crud.store import get_stores, get_store, create_store, update_store, delete_store
from app.schemas.store import Store, StoreCreate, StoreUpdate, StoreResponse
from app.core.database import get_db


router = APIRouter()


@router.get("/", response_model=List[Store])
def get_stores_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    stores = get_stores(db, skip=skip, limit=limit)
    return stores


@router.get("/{store_id}", response_model=Store)
def get_store_endpoint(store_id: int, db: Session = Depends(get_db)):
    response = get_store(db=db, store_id=store_id)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=StoreResponse.from_orm(response).dict()
    )


@router.post("/", response_model=Store)
def create_store_endpoint(store: StoreCreate, db: Session = Depends(get_db)):
    response = create_store(db=db, store=store)\

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=StoreResponse.from_orm(response).dict()
    )


@router.put("/{store_id}", response_model=Store)
def update_store_endpoint(store_id: int, store: StoreUpdate, db: Session = Depends(get_db)):
    response = update_store(db=db, store_id=store_id, store=store)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=StoreResponse.from_orm(response).dict()
    )


@router.delete("/{store_id}", response_model=Store)
def delete_store_endpoint(store_id: int, db: Session = Depends(get_db)):
    delete_store(db=db, store_id=store_id)

    return JSONResponse(
        status_code=status.HTTP_204_NO_CONTENT, content=None
    )
