# fast_api/app/crud/product.py
from typing import Optional, List
from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.models.store import Store
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product_data: ProductCreate) -> Product:
    new_product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        quantity=product_data.quantity,
        status=product_data.status,
        category_id=product_data.category_id
    )

    if product_data.stores:
        stores = db.query(Store).filter(Store.id.in_(product_data.stores)).all()
        new_product.stores.extend(stores)

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def update_product(db: Session, product_id: int, product: ProductUpdate):
    db_product = db.query(Product).filter(Product.id == product_id).first()

    if not db_product:
        return None

    for key, value in product.dict(exclude={"stores"}).items():
        setattr(db_product, key, value)

    if product.stores:
        if isinstance(product.stores[0], dict):
            store_ids = [store["id"] for store in product.stores]
        else:
            store_ids = [store.id for store in product.stores]

        stores = db.query(Store).filter(Store.id.in_(store_ids)).all()

        for store_data in product.stores:
            store_id = store_data.id
            store_name = store_data.name
            store = next((s for s in stores if s.id == store_id), None)
            if store:
                store.name = store_name

        db_product.stores.clear()
        db_product.stores.extend(stores)

    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()

    return db_product


def get_products(
        db: Session,
        skip: int = 0,
        limit: int = 10,
        category_id: Optional[int] = None,
        store_id: Optional[int] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
) -> List[Product]:
    query = db.query(Product).options(joinedload(Product.stores))

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    if store_id is not None:
        query = query.join(Product.stores).filter(Product.stores.any(id=store_id))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    query = query.offset(skip).limit(limit)

    return query.all()


def delete_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product
