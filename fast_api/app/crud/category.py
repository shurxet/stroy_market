# fast_api/app/crud/category.py
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


def get_categories(db: Session, skip: int = 0, limit: int = 10):
    db_categories = db.query(Category).offset(skip).limit(limit).all()  # Получаем категории с возможностью пагинации

    return db_categories


def get_category(db: Session, category_id: int):
    db_category = db.query(Category).filter(Category.id == category_id).first()

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail=f"Category with id {category_id} not found"
        )

    return db_category


def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)

    return db_category


def update_category(db: Session, category_id: int, category: CategoryUpdate):
    db_category = get_category(db, category_id)

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail=f"Category with id {category_id} not found"
        )

    for key, value in category.dict(exclude_unset=True).items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)

    return db_category


def delete_category(db: Session, category_id: int):
    db_category = get_category(db, category_id)
    if not db_category:
        raise HTTPException(
            status_code=404,
            detail=f"Category with id {category_id} not found"
        )

    db.delete(db_category)
    db.commit()

    return db_category
