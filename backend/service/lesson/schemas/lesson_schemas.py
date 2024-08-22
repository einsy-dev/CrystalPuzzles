from typing import List

from pydantic import Field

from datetime import datetime
from typing import Optional

from fastapi import Query

from common.schema.base_schemas import BaseModel, BaseFilterSchema
from service.lesson.schemas.space_schemas import SpaceSchemaForTable


class CreateLessonSchema(BaseModel):
    """ Схема создания моделей занятий """
    space_id: int
    trainer_id: int
    trainer_comments: Optional[str]
    start: datetime
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class EditLessonSchema(BaseModel):
    """ Схема изменения моделей занятий """
    id: int
    space_id: int
    trainer_id: int
    trainer_comments: Optional[str]
    start: datetime


class TrainerShortSchema(BaseModel):
    id: int
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    avatar: Optional[int]


class LessonSchemaForTable(BaseModel):
    """ Схема деталей занятия """
    id: int
    space: SpaceSchemaForTable
    trainer: TrainerShortSchema
    trainer_comments: Optional[str]
    start: datetime


class LessonViewSchemaForPage(BaseModel):
    """ Помтраничный вывод деталей моделей тренировок """
    page: int
    max_page_count: int
    count_records: int
    records: List[LessonSchemaForTable]


class LessonFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    start_date: datetime | None = Query(default=None, description="Дата начала занятия")
    trainer: int | None = Query(default=None, description="Тренер")



# class TestChecksSchema:
#     student_id: int
#     trainig_id: int
#     repetitions: str
#     assessment: str
#
# class TestCreateLessonSchema(BaseModel):
#     """ Схема создания моделей занятий """
#     space_id: int
#     trainer_id: int
#     trainer_comments: Optional[str]
#     start: datetime
#     date_add: datetime = Field(default_factory=datetime.now, hidden=True)
#     date_update: datetime = Field(default_factory=datetime.now, hidden=True)
#     checks: List[TestChecksSchema]
