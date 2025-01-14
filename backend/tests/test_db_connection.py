import pytest
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.sql import text  # Импортируем функцию text для текстовых запросов
from sqlalchemy.exc import OperationalError

@pytest.mark.asyncio
async def test_direct_database_connection():
    """Тест для проверки прямого подключения к базе данных."""
    # Данные для подключения
    PG_HOST = "localhost"  # Используем localhost для подключения из теста
    PG_PORT = 5432
    PG_USER = "crystal"
    PG_PASSWORD = "crystal"
    PG_DATABASE = "crystal"

    # Формируем URI подключения
    async_database_uri = f"postgresql+asyncpg://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DATABASE}"

    # Создаем движок подключения
    engine = create_async_engine(async_database_uri)

    try:
        # Устанавливаем соединение и выполняем тестовый запрос
        async with engine.connect() as connection:
            result = await connection.execute(text("SELECT 1;"))  # Используем text() для запроса
            assert result.scalar() == 1, "База данных недоступна"
    except OperationalError as e:
        pytest.fail(f"Ошибка подключения к базе данных: {e}")
    finally:
        # Закрываем движок
        await engine.dispose()


# def test_settings_database_uri():
#     """Тест для проверки корректности сборки URI базы данных."""
#     settings = get_settings()
#     async_database_uri = str(settings.async_database_uri)  # Преобразуем PostgresDsn в строку
#     print(settings.async_database_uri)

#     assert async_database_uri.startswith("postgresql+asyncpg://"), \
#         f"Неверный URI базы данных: {async_database_uri}"

# @pytest.mark.asyncio
# async def test_database_connection():
#     """Тест для проверки подключения к базе данных."""
#     settings = get_settings()  # Получаем экземпляр настроек
#     async_database_uri = str(settings.async_database_uri)  # Преобразуем в строку

#     # Создаем движок подключения
#     engine = create_async_engine(async_database_uri)

#     try:
#         # Устанавливаем соединение и выполняем тестовый запрос
#         async with engine.connect() as connection:
#             result = await connection.execute("SELECT 1;")
#             assert result.scalar() == 1, "База данных недоступна"
#     except OperationalError as e:
#         pytest.fail(f"Ошибка подключения к базе данных: {e}")
#     finally:
#         # Закрываем движок
#         await engine.dispose()
