from http import HTTPStatus

from fastapi import APIRouter, Response
from starlette.responses import JSONResponse

from common.dependensies import AdminDep, SupervisorAdminDep, UserDep
from common.schema.base_schemas import Message
from service.lesson.dependensies import LessonServiceDep, LessonUOWDep, LessonFilterDep, SpaceUOWDep
from service.users.dependensies import UserUOWDep

from service.lesson.schemas.lesson_schemas import LessonSchemaForTable, LessonViewSchemaForPage, \
    CreateLessonSchema, EditLessonSchema

lesson_router = APIRouter(
    prefix="/api/v1/lesson",
    tags=["Lesson"]
)


@lesson_router.get(
    "/{lesson_id}",
    summary="Получение занятия по Id",
    response_model=LessonSchemaForTable,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def get_lesson(
        lesson_id: int,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: UserDep,
):
    """ admin, supervisor, trainer """
    result = await lesson_service.get(uow, lesson_id, user=current_user)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")


@lesson_router.get(
    "/",
    summary=" Получение всех занятий",
    response_model=LessonViewSchemaForPage,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def get_all_lessons(
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        filters: LessonFilterDep,
        current_user: UserDep
):
    """ admin, supervisor, trainer """
    result = await lesson_service.get_all_by_filters(uow, filters, user=current_user)
    return result


@lesson_router.post(
    "/",
    summary="Создание занятия",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def create_lesson(
        model: CreateLessonSchema,
        uow: LessonUOWDep,
        user_uow: UserUOWDep,
        space_uow: SpaceUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.add(uow, model, user_uow=user_uow, space_uow=space_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.CONFLICT.value, content="Lesson existing")


@lesson_router.put(
    "/",
    summary="Изменение занятия",
    response_model=bool,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        409: {"model": Message, "description": "Конфликт данных"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def edit_lesson(
        model: EditLessonSchema,
        uow: LessonUOWDep,
        user_uow: UserUOWDep,
        space_uow: SpaceUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.edit(uow, model, user_uow=user_uow, space_uow=space_uow)
    if result:
        return result
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson already exists")


@lesson_router.delete(
    "/{lesson_id}",
    summary="Удаление занятия",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def delete_lesson(
        lesson_id: int,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: SupervisorAdminDep
):
    """admin, supervisor"""
    result = await lesson_service.delete(uow, lesson_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")


@lesson_router.delete(
    "/remove/{lesson_id}",
    summary="Удаление занятия из базы",
    status_code=HTTPStatus.NO_CONTENT.value,
    responses={
        204: {"description": "Нет данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}}
)
async def remove_lesson(
        lesson_id: int,
        uow: LessonUOWDep,
        lesson_service: LessonServiceDep,
        current_user: AdminDep
):
    """ admin """
    result = await lesson_service.delete_db(uow, lesson_id)
    if result:
        return Response(status_code=HTTPStatus.NO_CONTENT.value)
    return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Lesson not found")
