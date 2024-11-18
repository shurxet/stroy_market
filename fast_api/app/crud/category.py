# fast_api/app/crud/category.py
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from fastapi.responses import JSONResponse, Response


# CRUD для категорий
def get_category(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()


def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Category).offset(skip).limit(limit).all()  # Получаем категории с возможностью пагинации


def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=CategoryResponse.from_orm(db_category).dict()
    )


def update_category(db: Session, category_id: int, category: CategoryUpdate):
    db_category = get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")

    for key, value in category.dict(exclude_unset=True).items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(db_category)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# from sqlalchemy.future import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.models import Category
# from app.schemas.category import CategoryCreate, CategoryUpdate
#
#
# # Асинхронное получение всех категорий
# async def get_categories(db: AsyncSession, skip: int = 0, limit: int = 20):
#     result = await db.execute(select(Category).offset(skip).limit(limit))
#     return result.scalars().all()
#
#
# # Асинхронное получение категории по id
# async def get_category(db: AsyncSession, category_id: int):
#     result = await db.execute(select(Category).filter(Category.id == category_id))
#     return result.scalar_one_or_none()
#
#
# # Асинхронное создание категории
# async def create_category(db: AsyncSession, category: CategoryCreate):
#     db_category = Category(**category.dict())
#     db.add(db_category)
#     await db.commit()
#     await db.refresh(db_category)
#     return db_category
#
#
# # Асинхронное обновление категории
# async def update_category(db: AsyncSession, category_id: int, category: CategoryUpdate):
#     db_category = await get_category(db, category_id)
#     if db_category is None:
#         return None
#     for key, value in category.dict(exclude_unset=True).items():
#         setattr(db_category, key, value)
#     await db.commit()
#     await db.refresh(db_category)
#     return db_category
#
#
# # Асинхронное удаление категории
# async def delete_category(db: AsyncSession, category_id: int):
#     db_category = await get_category(db, category_id)
#     if db_category is None:
#         return None
#     await db.delete(db_category)
#     await db.commit()
#     return db_category
