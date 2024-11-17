# fast_api/app/api/store.py
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import store as crud
from app.schemas.store import Store, StoreCreate
from app.core.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Store])
def get_store(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    stores = crud.get_store(db, skip=skip, limit=limit)
    return stores


@router.post("/", response_model=Store)
def create_store(store: StoreCreate, db: Session = Depends(get_db)):
    return crud.create_store(db=db, store=store)
