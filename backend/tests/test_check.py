import pytest
from fastapi.testclient import TestClient
from fastapi import status
from unittest.mock import AsyncMock

from main import app  # Импорт вашего приложения FastAPI
from service.lesson.unit_of_work.check_uow import CheckUOW
from service.users.models import User
from service.lesson.models import Check, TrainingCheck, Lesson
from service.training.models import Training  # Импорт Training

# Создаем клиента для тестирования
client = TestClient(app)

@pytest.fixture
def auth_token():
    # Делаем запрос к эндпоинту авторизации для получения токена
    response = client.post(
        "/api/v1/auth/login/",  # Эндпоинт для авторизации
        headers={"Content-Type": "application/x-www-form-urlencoded"},  # Правильный заголовок
        data={
            "grant_type": "password",
            "username": "supervisor@crystal.com",
            "password": "supervisorpass",
            "scope": "",
            "client_id": "string",
            "client_secret": "string",
        },
    )


@pytest.fixture
def auth_token():
    # Делаем запрос к эндпоинту авторизации для получения токена
    response = client.post(
        url="/api/v1/auth/login/",  # Эндпоинт для авторизации
        headers={
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data={
            "grant_type": "password",
            "username": "supervisor@crystal.com",
            "password": "supervisorpass",
            "scope": "",
            "client_id": "string",
            "client_secret": "string",
        },
    )

    # Проверяем, что запрос выполнился успешно
    assert response.status_code == status.HTTP_200_OK, f"Ошибка получения токена: {response.json()}"
    
    # Получаем токен из ответа
    token = response.json()["access_token"]
    
    # Выводим токен в консоль для отладки
    print(f"Получен токен авторизации: {token}")
    
    # Возвращаем токен в формате 'Bearer <токен>'
    return f"Bearer {token}"

# Фикстура для создания тестового пользователя
@pytest.fixture
def test_user():
    return User(
        id=1,
        firstname="Test",
        lastname="User",
        surname="Testovich",
        role="admin",  # Убедитесь, что роль соответствует вашим ожиданиям
    )

# Фикстура для мока UOW
@pytest.fixture
def mock_uow(mocker):
    mock_uow = mocker.MagicMock(spec=CheckUOW)
    mock_uow.repo.get_checks_by_filter = AsyncMock(return_value=[
        Check(
            id=1,
            lesson_id=1,
            student_id=1,
            comment="Test comment",
            awards=None,
            training_data=[
                TrainingCheck(
                    training_id=1,
                    repetitions=10,
                    assessment=8,
                    training=Training(  # Добавляем связь с Training
                        id=1,
                        name="Test Training",
                        description="Test Description",
                        level_id=1,
                        check_data=[]  # Пустой список, так как SQLAlchemy ожидает это поле
                    )
                )
            ],
        )
    ])
    return mock_uow

# # Тест на получение всех чеков
# def test_get_all_checks(mock_uow, test_user, auth_token, mocker):
#     # Мокаем зависимость get_current_user
#     mocker.patch(
#         "service.identity.security.get_current_user",
#         return_value=test_user,
#     )

#     # Мокаем зависимость CheckUOWDep
#     mocker.patch(
#         "service.lesson.dependensies.CheckUOWDep",
#         return_value=mock_uow,
#     )

#     # Делаем GET-запрос к эндпоинту
#     response = client.get(
#         "/api/v1/check/?page=1&per_page=10",
#         headers={"Authorization": auth_token},  # Передаём реальный токен в заголовке
#     )

#     # Проверяем статус код ответа
#     assert response.status_code == status.HTTP_200_OK, f"Ошибка: {response.json()}"

#     # Проверяем структуру ответа
#     data = response.json()
#     assert "count_records" in data
#     assert "page" in data
#     assert "max_page_count" in data
#     assert "records" in data

#     # Проверяем данные внутри records
#     assert len(data["records"]) == 1
#     record = data["records"][0]
#     assert record["id"] == 1
#     assert record["lesson_id"] == 1
#     assert record["student_id"] == 1
#     assert record["comment"] == "Test comment"
#     assert record["training_data"][0]["training_id"] == 1
#     assert record["training_data"][0]["repetitions"] == 10
#     assert record["training_data"][0]["assessment"] == 8