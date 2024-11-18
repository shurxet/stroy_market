# alembic/env.py


# import os
# import sys
#
# from dotenv import load_dotenv
# from logging.config import fileConfig
# from sqlalchemy import engine_from_config
# from sqlalchemy import pool
# from alembic import context
# from app.models import Base  # Убедитесь, что импорт правильный
# from app.core.config import settings  # Импортируем настройки из config.py
#
#
# # Загружаем переменные окружения из файла .env
# load_dotenv()
#
# # DATABASE_URL = "postgresql://user:password@localhost/dbname"
#
# # # Получаем конфигурацию Alembic
# # config = context.config
# #
# # # Загружаем конфигурацию логирования
# # if config.config_file_name is not None:
# #     fileConfig(config.config_file_name)
#
# # Устанавливаем URL базы данных из переменной окружения
# # url = os.getenv('DATABASE_URL')
# # if url is None:
# #     raise ValueError("DATABASE_URL environment variable not set.")
# # config.set_main_option('sqlalchemy.url', url)
#
# # # Устанавливаем URL базы данных из переменных окружения, получаем из settings
# # url = settings.DATABASE_URL  # Используем строку подключения из settings
# # if url is None:
# #     raise ValueError("DATABASE_URL environment variable not set.")
# # config.set_main_option('sqlalchemy.url', url)
#
#
#
# # Проверяем, если это тестовая среда
# if 'pytest' in sys.modules:
#     # Пропускаем конфигурацию Alembic при тестировании
#     config = None
# else:
#     # Настройка конфигурации для работы в реальной среде
#     config = context.config
#
#     # Загружаем конфигурацию логирования
#     if config.config_file_name is not None:
#         fileConfig(config.config_file_name)
#
#     url = settings.DATABASE_URL
#     if url is None:
#         raise ValueError("DATABASE_URL environment variable not set.")
#     config.set_main_option('sqlalchemy.url', url)
#
#
# # Устанавливаем target_metadata для автоматической генерации миграций
# target_metadata = Base.metadata
#
#
# # def run_migrations_offline() -> None:
# #     """Запускает миграции в оффлайн-режиме."""
# #     context.configure(
# #         url=url,
# #         target_metadata=target_metadata,
# #         literal_binds=True,
# #         dialect_opts={"paramstyle": "named"},
# #     )
# #
# #     with context.begin_transaction():
# #         context.run_migrations()
# #
# #
# # def run_migrations_online() -> None:
# #     """Запускает миграции в онлайн-режиме."""
# #     connectable = engine_from_config(
# #         config.get_section(config.config_ini_section, {}),
# #         prefix="sqlalchemy.",
# #         poolclass=pool.NullPool,
# #     )
# #
# #     with connectable.connect() as connection:
# #         context.configure(
# #             connection=connection,
# #             target_metadata=target_metadata
# #         )
# #
# #         with context.begin_transaction():
# #             context.run_migrations()
#
#
# # if context.is_offline_mode():
# #     run_migrations_offline()
# # else:
# #     run_migrations_online()
#
#
#
# # Выполнение миграций в зависимости от режима
#
#
# def run_migrations_offline() -> None:
#     """Запускает миграции в оффлайн-режиме."""
#     context.configure(
#         url=url,
#         target_metadata=target_metadata,
#         literal_binds=True,
#         dialect_opts={"paramstyle": "named"},
#     )
#
#     with context.begin_transaction():
#         context.run_migrations()
#
# def run_migrations_online() -> None:
#     """Запускает миграции в онлайн-режиме."""
#     connectable = engine_from_config(
#         config.get_section(config.config_ini_section, {}),
#         prefix="sqlalchemy.",
#         poolclass=pool.NullPool,
#     )
#
#     with connectable.connect() as connection:
#         context.configure(
#             connection=connection,
#             target_metadata=target_metadata
#         )
#
#         with context.begin_transaction():
#             context.run_migrations()
#
#
# if config and context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()





import os
import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.models import Base
from app.core.config import settings

# Проверяем, если это тестовая среда
if 'pytest' in sys.modules:
    # Пропускаем конфигурацию Alembic при тестировании
    config = None
else:
    # Настройка конфигурации для работы в реальной среде
    config = context.config

    # Загружаем конфигурацию логирования
    if config and config.config_file_name is not None:
        fileConfig(config.config_file_name)

    url = settings.DATABASE_URL
    if url is None:
        raise ValueError("DATABASE_URL environment variable not set.")
    if config:
        config.set_main_option('sqlalchemy.url', url)

# Подключение метаданных для миграций
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Запускает миграции в оффлайн-режиме."""
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Запускает миграции в онлайн-режиме."""
    if config:
        connectable = engine_from_config(
            config.get_section(config.config_ini_section, {}),
            prefix="sqlalchemy.",
            poolclass=pool.NullPool,
        )

        with connectable.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata
            )

            with context.begin_transaction():
                context.run_migrations()

# Выполнение миграций в зависимости от режима
if config and context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()