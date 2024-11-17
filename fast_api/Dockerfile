# ./Dockerfile

# Используем официальный образ Python
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY pyproject.toml poetry.lock ./

RUN pip install poetry && poetry install --no-dev

# Копируем весь код в контейнер
COPY . .

# Копируем скрипт запуска
COPY entrypoint.sh ./

# Даем разрешение на выполнение скрипта
RUN chmod +x entrypoint.sh
