#!/bin/bash

# Убедитесь, что база данных готова к приему миграций
# Здесь можно добавить проверку на доступность БД, если необходимо

# Применяем миграции
poetry run alembic upgrade head
