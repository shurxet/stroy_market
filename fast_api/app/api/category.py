# fast_api/app/api/category.py
from typing import List
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.crud import category as crud
from app.schemas.category import Category, CategoryCreate, CategoryUpdate, CategoryResponse
from app.core.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Category])
def get_categories(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    response = crud.get_categories(db, skip=skip, limit=limit)

    return response


@router.get("/{category_id}", response_model=Category)
def get_category(category_id: int, db: Session = Depends(get_db)):
    response = crud.get_category(db=db, category_id=category_id)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=CategoryResponse.from_orm(response).dict()
    )


@router.post("/", response_model=Category)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    response = crud.create_category(db=db, category=category)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=CategoryResponse.from_orm(response).dict()
    )


@router.put("/{category_id}", response_model=Category)
def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)):
    response = crud.update_category(db=db, category_id=category_id, category=category)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=CategoryResponse.from_orm(response).dict()
    )


@router.delete("/{category_id}", response_model=Category)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    crud.delete_category(db=db, category_id=category_id)

    return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content=None)
