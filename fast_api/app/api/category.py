# fast_api/app/api/category.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import category as crud
from app.schemas.category import Category, CategoryCreate, CategoryUpdate
from app.core.database import get_db

router = APIRouter()


@router.get("/", response_model=List[Category])
def read_categories(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories


@router.get("/{category_id}", response_model=Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    category = crud.get_category(db=db, category_id=category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("/", response_model=Category)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db=db, category=category)


@router.put("/{category_id}", response_model=Category)
def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)):
    updated_category = crud.update_category(db=db, category_id=category_id, category=category)
    if updated_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated_category


@router.delete("/{category_id}", response_model=Category)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    deleted_category = crud.delete_category(db=db, category_id=category_id)
    if deleted_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return deleted_category





# from typing import List
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.crud import category as crud
# from app.schemas.category import Category, CategoryCreate, CategoryUpdate
# from app.core.database import get_db
#
# router = APIRouter()
#
#
# @router.get("/", response_model=List[Category])
# async def read_categories(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_db)):
#     categories = await crud.get_categories(db, skip=skip, limit=limit)
#     return categories
#
#
# @router.get("/{category_id}", response_model=Category)
# async def read_category(category_id: int, db: AsyncSession = Depends(get_db)):
#     category = await crud.get_category(db=db, category_id=category_id)
#     if category is None:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return category
#
#
# @router.post("/", response_model=Category)
# async def create_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
#     return await crud.create_category(db=db, category=category)
#
#
# @router.put("/{category_id}", response_model=Category)
# async def update_category(category_id: int, category: CategoryUpdate, db: AsyncSession = Depends(get_db)):
#     updated_category = await crud.update_category(db=db, category_id=category_id, category=category)
#     if updated_category is None:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return updated_category
#
#
# @router.delete("/{category_id}", response_model=Category)
# async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
#     deleted_category = await crud.delete_category(db=db, category_id=category_id)
#     if deleted_category is None:
#         raise HTTPException(status_code=404, detail="Category not found")
#     return deleted_category
