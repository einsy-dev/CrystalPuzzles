from pprint import pprint
from common.service.base_service import BaseService
from service.lesson.unit_of_work.check_uow import CheckUOW


class CheckService(BaseService):
    """
    Сервисный слой, который содержит бизнес-логику работы с чек-листами.
    """
    @staticmethod
    async def add_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        # Открываем контекст uow, чтобы начать транзакцию
        async with uow:
            # Вызываем репозиторий uow.repo.add_user_for_lesson, чтобы добавить данные пользователя к уроку
            result = await uow.repo.add_user_for_lesson(lesson_id, data)
            # Фиксируем изменения через uow.commit()
            await uow.commit()
            return result

    @staticmethod
    async def delete_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        async with uow:
            result = await uow.repo.delete_user_for_lesson(lesson_id, data)
            await uow.commit()
            return result

    @staticmethod
    async def add_check_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        
        print(f'add_check_for_lesson: lesson_id: {lesson_id}') 
        pprint(dict)

        async with uow:
            result = await uow.repo.add_check_for_lesson(data)
            await uow.commit()
            return result
        
        return True
    

    # @staticmethod
    # async def get_all_by_filters(uow: CheckUOW, filters: CheckFilterSchema, **kwargs):
    #     async with uow:
    #         if kwargs["user"].role.__eq__("student"):
    #             result = await uow.repo.get_all_lesson_by_filter(filters, student_id=kwargs["user"].id)
    #         else:
    #             result = await uow.repo.get_all_lesson_by_filter(filters)
            # return result