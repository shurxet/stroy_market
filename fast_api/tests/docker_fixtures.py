# tests/docker_fixtures.py
import time
import docker
import pytest
import psycopg2
from psycopg2 import OperationalError
from docker.errors import APIError


def wait_for_postgres(
        host="localhost",
        port=5432,
        user="user",
        password="password",
        dbname="dbname",
        retries=10,
        delay=5
):
    """Ожидание готовности базы данных PostgreSQL."""
    try:
        # Повторная попытка подключения к базе данных
        for _ in range(retries):
            try:
                # Попытка подключения к базе данных
                conn = psycopg2.connect(
                    host=host,
                    port=port,
                    user=user,
                    password=password,
                    dbname=dbname
                )
                conn.close()
                print("PostgreSQL is ready")
                return
            except OperationalError:
                # База данных ещё не готова
                print(f"PostgreSQL not ready, retrying in {delay} seconds...")
                time.sleep(delay)
        raise Exception(f"PostgreSQL did not become ready after {retries} retries.")
    except Exception as e:
        print(str(e))
        raise


# Фикстура для запуска контейнера PostgreSQL с Docker
@pytest.fixture(scope="session", autouse=True)
def start_postgres_container():
    # Настройка Docker клиента
    client = docker.from_env()

    # Запуск контейнера с PostgreSQL
    container = client.containers.run(
        "postgres:latest",
        environment={"POSTGRES_DB": "dbname", "POSTGRES_USER": "user", "POSTGRES_PASSWORD": "password"},
        ports={"5432/tcp": 5432},
        detach=True,
        remove=False
    )

    # Ожидаем, пока контейнер и база данных будут готовы
    wait_for_postgres(host="localhost", port=5432, user="user", password="password", dbname="dbname")

    yield container  # Контейнер будет использоваться в тестах

    # После завершения тестов
    if container.status == 'running':
        print("Stopping container...")
        container.stop()  # Останавливаем контейнер
        print("Container stopped.")

    # Добавляем принудительное удаление контейнера
    try:
        print("Removing container...")
        container.remove(force=True)  # Принудительное удаление контейнера
        print(f"Container {container.id} removed.")
    except APIError as e:
        print(f"Error while removing container: {e}")
