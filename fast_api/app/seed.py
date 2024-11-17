from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.product import Product
from app.models.category import Category
from app.models.store import Store
import random

# Список категорий
CATEGORIES = [
    "Стены", "Крыши", "Полы", "Фундамент", "Покрытия", "Отделочные материалы",
    "Электрика", "Сантехника", "Инструменты", "Затворы", "Теплоизоляция",
    "Гидроизоляция", "Строительные смеси", "Бетон", "Кирпич", "Дерево"
]

# Список магазинов
STORES = [
    "улица 1, дом 1", "улица 2, дом 1", "улица 3, дом 1", "улица 4, дом 1",
    "улица 5, дом 1", "улица 6, дом 1", "улица 7, дом 1", "улица 8, дом 1",
    "улица 9, дом 1", "улица 10, дом 1", "улица 11, дом 1", "улица 12, дом 1",
    "улица 13, дом 1", "улица 14, дом 1", "улица 15, дом 1", "улица 16, дом 1",
    "улица 17, дом 1", "улица 18, дом 1", "улица 19, дом 1", "улица 20, дом 1",
    "улица 21, дом 1", "улица 22, дом 1", "улица 23, дом 1", "улица 24, дом 1",
    "улица 25, дом 1", "улица 26, дом 1", "улица 27, дом 1", "улица 28, дом 1",
    "улица 29, дом 1", "улица 30, дом 1", "улица 31, дом 1", "улица 32, дом 1",
]


# Функция для генерации данных
def create_sample_data(db: Session):
    # Создаем категории
    categories = [Category(name=name) for name in CATEGORIES]
    db.add_all(categories)
    db.commit()

    # Создаем магазины
    stores = [Store(name=name) for name in STORES]
    db.add_all(stores)
    db.commit()

    # Генерация продуктов
    products = []
    for i in range(20):
        product = Product(
            name=f"Строительный материал {i + 1}",
            description=f"Описание строительного материала {i + 1}",
            price=random.randint(100, 5000),  # случайная цена от 100 до 5000
            quantity=random.randint(1, 100),  # случайное количество от 1 до 100
            status=random.choice(["в наличии", "под заказ", "нет в наличии"]),
            category_id=random.choice([category.id for category in categories])  # случайный ID категории
        )

        # Добавление адресов магазинов к продукту
        product.stores = random.sample(
            stores, k=random.randint(1, 7)
        )  # случайно выбираем от 1 до 5 магазинов

        products.append(product)

    db.add_all(products)
    db.commit()


def main():
    db = next(get_db())
    create_sample_data(db)
    print("Пробные данные успешно загружены!")


if __name__ == "__main__":
    main()
