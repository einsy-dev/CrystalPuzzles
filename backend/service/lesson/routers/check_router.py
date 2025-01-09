from http import HTTPStatus

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from starlette.responses import JSONResponse

from common.dependensies import TrainerSupervisorAdminDep, TrainerDep
from common.schema.base_schemas import Message
from core.logger import logger
from service.lesson.dependensies import CheckUOWDep, CheckServiceDep
from service.lesson.unit_of_work.lesson_uow import LessonUOW
from service.users.models import User
from service.users.repository import UserRepository
from service.lesson.schemas.lesson_schemas import MakeCheckList, GetCheckList

from service.identity.security import get_current_user
from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.schemas.check_schema import CreateCheckSchema, CreateCheckSchemaTest

from service.lesson.dependensies import LessonServiceDep, LessonUOWDep, LessonFilterDep, SpaceUOWDep, CheckUOWDep, MakeCheckListDep

from pprint import pprint

check_router = APIRouter(
    prefix="/api/v1/check",
    tags=["Check"]
)

@check_router.get(
    "/",
    summary=" Получение всех занятий",
    # response_model=LessonViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
def get_all_checks(
    # model: MakeCheckList, # MakeCheckListDep = Annotated[MakeCheckListDep, Depends(MakeCheckListDep)]
    uow: CheckUOWDep, # Ещё один UOW для работы с репозиториями чек-листов.
    lesson_service: LessonServiceDep,
    check_service: CheckServiceDep,    
    # current_user: TrainerDep
):
    return {"responce": "Hello!"}

@check_router.get(
    "/list",
    summary="Получение всех чек-листов с фильтрацией",
    responses={
        200: {"description": "Успешное получение данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}
    }
)
async def get_checklists(
    model: GetCheckList,
    uow: CheckUOWDep,
    current_user: TrainerSupervisorAdminDep
):
    role = current_user.role  # Роль пользователя: тренер, супервизор или админ.

    # Проверяем роль пользователя.
    if role not in ["trainer", "supervisor", "admin"]:
        raise HTTPException(status_code=403, detail="Недостаточно прав для выполнения операции")
    
    filters = {}
    if model.lesson_id:
        filters["lesson_id"] = model.lesson_id
        print(f'lesson_id: {filters.get("lesson_id")}')
    else:
        print('no lesson_id')
    if model.student_id:
        filters["student_id"] = model.student_id
        print(f'student_id: {filters.get("student_id")}')
    else:
        print('no student_id')

    async with uow:
        if role == "trainer":
            # Тренеры могут видеть только свои уроки
            filters["trainer_id"] = current_user.id
        elif role == "supervisor":
            # Супервизоры могут видеть уроки тренеров, которыми они управляют
            filters["supervisor_id"] = current_user.id
        # Админ видит все данные без дополнительных фильтров

        checklists = await uow.repo.get_checks_by_filter(**filters)
    
    return {"data": checklists}


@check_router.post(
    "/",
    summary="Создание Чек-листа",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_check(
    model: MakeCheckList, # MakeCheckListDep = Annotated[MakeCheckListDep, Depends(MakeCheckListDep)]
    uow: CheckUOWDep, # Ещё один UOW для работы с репозиториями чек-листов.
    lesson_service: LessonServiceDep,
    check_service: CheckServiceDep,    
    current_user: TrainerDep
):
    # Вызов сервиса для добавления чек-листа к уроку
    result = True
    result = await check_service.add_check_for_lesson(
        uow=uow,
        lesson_id=model.lesson_id,
        data=model.dict()
    )

    # Проверка результата и возврат ответа
    if result:
        print("Чек-лист успешно создан.")
        return True

    # Возвращаем ответ с ошибкой, если чек-лист уже существует
    print("Ошибка: Чек-лист уже существует.")
    raise JSONResponse(
        status_code=HTTPStatus.CONFLICT.value,
        content={"detail": "Check existing"}
    )

    return True

# async def create_check_to_base(
#     model: CreateCheckSchema,
#     lesson_uow: LessonUOW = Depends(),
#     uow: CheckUOWDep = Depends(),
#     check_service=Depends(get_check_service) 
# ) -> bool:
#     """
#     Сохранение чек-листа в базу данных.
#     """
#     print("Сохранение данных в базу:")
#     pprint(model.dict())

#     # Вызов сервиса для добавления чек-листа к уроку
#     result = await check_service.add_check_for_lesson(
#         uow=uow,
#         model=model,
#         lesson_uow=lesson_uow
#     )

#     # Проверка результата и возврат ответа
#     if result:
#         print("Чек-лист успешно создан.")
#         return True

#     # Возвращаем ответ с ошибкой, если чек-лист уже существует
#     print("Ошибка: Чек-лист уже существует.")
#     raise JSONResponse(
#         status_code=HTTPStatus.CONFLICT.value,
#         content={"detail": "Check existing"}
#     )


# """
# Переход на страницу составления чек-листов.
# Заполняем форму, а именно:
#     - Состав учеников
#     - Состав упражнений на занятие и количество повторений
# """
# @check_router.post(
#     "/",
#     summary="Создание Чек-листа",
#     response_model=bool, #модель, которая описывает тип возвращаем данных
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         500: {"model": Message, "description": "Серверная ошибка"}},
# )
# async def create_check(
#         model: CreateCheckSchema, # Описывает входные данные (ID студентов, ID урока, даты и т. д.).
#         lesson_uow: LessonUOW, # Это объект Unit of Work (UOW), который используется для управления транзакциями и доступом к репозиторию уроков.
#         uow: CheckUOWDep, # Ещё один UOW для работы с репозиториями чек-листов.
#         check_service: CheckServiceDep, # Сервис для работы с логикой чек-листов. Это зависимость, созданная с помощью Annotated и Depends. Она создаёт экземпляр CheckService, который затем передаётся в обработчики запросов.
#         current_user: TrainerDep # Зависимость, определяющая текущего пользователя. Используется для контроля доступа.
# ):
#     """ trainer """
#     print('model')
#     pprint(model)
#     result = await check_service.add_check_for_lesson(
#         uow, #  для работы с транзакциями
#         model, #  данные, которые пришли от клиента
#         lesson_uow=lesson_uow # для работы с уроками
#         )
#     if result:
#         return result
#     return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Check existing")


# from fastapi import Request

# @check_router.post(
#     "/",
#     summary="Создание Чек-листа",
#     response_model=None,
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         500: {"model": Message, "description": "Серверная ошибка"}},
# )
# async def create_check(
#     request: Request,
#     lesson_uow=Depends(LessonUOW),
#     uow=Depends(CheckUOWDep),
#     check_service=Depends(CheckServiceDep),
#     current_user=Depends(TrainerDep)
# ):
#     data = await request.json()
#     print('Полученные данные:', data)

#     # Преобразование данных в Pydantic модель
#     model = CreateCheckSchema(**data)
#     pprint(model.dict())

#     result = await check_service.add_check_for_lesson(
#         uow,
#         model,
#         lesson_uow=lesson_uow
#     )
#     if result:
#         return result
#     return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Check existing")
