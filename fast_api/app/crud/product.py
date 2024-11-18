# fast_api/app/crud/product.py
from typing import Optional, List
from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.models.store import Store
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product_data: ProductCreate) -> Product:
    # Создаём новый продукт
    new_product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        quantity=product_data.quantity,
        status=product_data.status,
        category_id=product_data.category_id
    )

    # Добавляем магазины по их идентификаторам
    if product_data.stores:
        stores = db.query(Store).filter(Store.id.in_(product_data.stores)).all()
        new_product.stores.extend(stores)

    # Сохраняем продукт в базе данных
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def update_product(db: Session, product_id: int, product: ProductUpdate):
    print("Received product data:", product)
    print("Type of product data:", type(product))

    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return None

    # Обновление полей продукта, исключая магазины
    for key, value in product.dict(exclude={"stores"}).items():
        setattr(db_product, key, value)

    # Обновление магазинов
    if product.stores:
        # Проверка, что shops содержит словари
        if isinstance(product.stores[0], dict):
            store_ids = [store["id"] for store in product.stores]
            print("isinstance", store_ids)
        else:
            store_ids = [store.id for store in product.stores]
            print("else", store_ids)

        # Получение магазинов из БД
        stores = db.query(Store).filter(Store.id.in_(store_ids)).all()

        # Обновление названий магазинов, если они были переданы
        for store_data in product.stores:
            store_id = store_data.id
            store_name = store_data.name

            # Поиск соответствующего магазина
            store = next((s for s in stores if s.id == store_id), None)
            if store:
                store.name = store_name  # Обновляем имя магазина, если он существует

        # Очистка текущих ассоциаций
        db_product.stores.clear()  # Удалить все текущие ассоциации
        db_product.stores.extend(stores)  # Добавить новые ассоциации

    db.commit()
    db.refresh(db_product)
    return db_product



def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def get_products(
        db: Session,
        skip: int = 0,
        limit: int = 10,
        category_id: Optional[int] = None,
        store_id: Optional[int] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
) -> List[Product]:
    query = db.query(Product).options(joinedload(Product.stores))  # Используем joinedload для загрузки магазинов

    # Фильтрация по ID категории
    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    # Фильтрация по ID производителя (многие ко многим)
    if store_id is not None:
        query = query.join(Product.stores).filter(Product.stores.any(id=store_id))

    # Фильтрация по минимальной и максимальной цене
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    # Пагинация
    query = query.offset(skip).limit(limit)
    return query.all()


def delete_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product
