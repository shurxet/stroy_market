
# Проект stroy_market: Full-Stack Приложение

Это проект для управления строительным маркетом. Он состоит из бэкенда на FastAPI и фронтенда на React (с Vite). Проект поддерживает работу с базой данных PostgreSQL и миграции с использованием Alembic. Для удобства развертывания используется Docker.

---

## Содержание

1. [Функции](#функции)  
2. [Используемые технологии](#используемые-технологии)  
3. [Установка](#установка)  
4. [Конфигурация](#конфигурация)  
5. [Запуск приложения](#запуск-приложения)  
6. [Миграции базы данных](#миграции-базы-данных)  
7. [API-эндпоинты](#api-эндпоинты)  
8. [Тестирование](#тестирование)  
9. [Участие в разработке](#участие-в-разработке)  
10. [Лицензия](#лицензия)

---

## Функции

- **Бэкенд**: RESTful API с FastAPI.  
- **Фронтенд**: Веб-интерфейс на React с Vite.  
- **База данных**: PostgreSQL.  
- **Миграции**: Управление с помощью Alembic.  
- **Докеризация**: Полная поддержка Docker для фронтенда, бэкенда и базы данных.  
- **Проверка готовности**: Healthcheck для базы данных и бэкенда.  

---

## Используемые технологии

- [FastAPI](https://fastapi.tiangolo.com/)  
- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Alembic](https://alembic.sqlalchemy.org/)  
- [Docker](https://www.docker.com/)  
- [Poetry](https://python-poetry.org/)  
- [Pydantic](https://pydantic-docs.helpmanual.io/)  

---

## Установка

### 1. Клонирование репозитория:

```bash
git clone https://github.com/shurxet/stroy_market.git
cd stroy_market
```

---

### 2. Создание `.env` файлов:

#### Бэкенд (`fast_api/.env`):
```env
DATABASE_URL=postgresql://user:password@db:5432/dbname
```

#### Фронтенд (`vite_react/.env`):
```env
VITE_API_URL=http://localhost:8000
```

---

### 3. Установка зависимостей:

#### Для бэкенда:
```bash
cd fast_api
poetry install
```

#### Для фронтенда:
```bash
cd vite_react
npm install
```

---

## Конфигурация

Бэкенд и фронтенд используют переменные окружения для конфигурации. Убедитесь, что вы настроили `.env` файлы правильно (см. [Установка](#установка)).

---

## Запуск приложения

Создание файла .env
Для успешного запуска контейнеров необходимо создать файл .env в корневой директории проекта. Этот файл должен содержать следующие переменные окружения:

env
Копировать код
POSTGRES_DB=dbname
POSTGRES_USER=user
POSTGRES_PASSWORD=password
DATABASE_URL=postgresql://user:password@db:5432/dbname
Примечания:
POSTGRES_DB: Имя базы данных, которая будет создана в PostgreSQL.
POSTGRES_USER: Пользователь, который будет иметь доступ к базе данных.
POSTGRES_PASSWORD: Пароль для указанного пользователя PostgreSQL.
DATABASE_URL: URL подключения к базе данных, используемый приложением FastAPI.

Проект использует Docker для развертывания. Все сервисы можно запустить одной командой:


```bash
docker-compose up -d --build
```

После запуска:

- **Фронтенд**: [http://localhost:3000](http://localhost:3000)  
- **Бэкенд**: [http://localhost:8000](http://localhost:8000)  
  - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)  

---

## Миграции базы данных

Для управления миграциями используется Alembic.

- **Запуск миграций**:
  ```bash
  docker-compose run backend alembic upgrade head
  ```
- **Создание новой миграции**:
  ```bash
  docker-compose run back alembic revision --autogenerate -m "Ваше сообщение о миграции"
  ```

---

## API-эндпоинты

Примеры эндпоинтов (добавьте свои):

- **GET /products**: Получить список продуктов.  
- **POST /products**: Добавить продукт.  
- **GET /products/{id}**: Получить продукт по ID.  
- **PUT /products/{id}**: Обновить продукт по ID.
- **DELETE /products/{id}**: Удалить продукт по ID.

- **GET /categories**: Получить список категорий.  
- **POST /categories**: Добавить категорию.  
- **GET /categories/{id}**: Получить категорию по ID.  
- **PUT /categories/{id}**: Обновить категорию по ID.

- **GET /stores**: Получить список магазинов.  
- **POST /stores**: Добавить магазин.  
- **GET /stores/{id}**: Получить магазин по ID.  
- **PUT /stores/{id}**: Обновить магазин по ID.

---

## Тестирование

Тесты для бэкенда можно запускать с помощью Pytest:

```bash
docker-compose run back pytest
```

---

## Участие в разработке

Если вы хотите внести свой вклад, клонируйте репозиторий, создайте ветку и отправьте PR.

---

## Лицензия

Этот проект доступен под лицензией MIT.

---
