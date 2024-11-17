#!/bin/bash

# Даем время базе данных на инициализацию
sleep 10

# Обновляем PATH для доступа к uvicorn
export PATH="$PATH:/root/.local/bin"

# Запускаем скрипт для заполнения базы данных
poetry run python -m app.seed

# Запускаем приложение FastAPI
exec poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
