from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa


from common.model.base_model import Base
from common.enum import lesson as enum # импорт перечислений, которые используются для статусов уроков.


class Award(Base):
    __tablename__ = "Awards"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(sa.String(255), nullable=False)


class Lesson(Base):
    '''
    Модель урока
    '''
    __tablename__ = "Lessons"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.ForeignKey('Users.id'), nullable=True)
    trainer = relationship("User", back_populates="lessons")

    space_id: Mapped[int] = mapped_column(sa.ForeignKey('Spaces.id'), nullable=True)
    space = relationship("Space", back_populates="lessons")

    trainer_comments: Mapped[str] = mapped_column(sa.Text, nullable=True)
    
    # Статус урока, используется перечисление (Enum), по умолчанию значение created
    status = mapped_column(
        "status",
        sa.Enum(
            enum.StatusTypeEnum,
            name="status_type_enum"
        ),
        nullable=False,
        default=enum.StatusTypeEnum.created,
        server_default=enum.StatusTypeEnum.created.value
    )
    # дата и время начала урока.
    start: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    # логическое удаление (мягкое удаление)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    # связь один-ко-многим с таблицей Check
    check = relationship("Check", back_populates="lesson")


class Space(Base):
    '''
    Модель места проведения занятий
    '''
    __tablename__ = "Spaces"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(sa.String(255), nullable=True)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    # связь один-ко-многим с таблицей Lesson
    lessons = relationship("Lesson", back_populates="space")


class Check(Base):
    '''
    Модель таблицы Проверки. 
    Содержит связь  с таблицей пользовтерля через student_id 
    связь с таблицей урока через lesson_id.
    Награды связаны через awards
    '''
    __tablename__ = "Checks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    student_id: Mapped[int] = mapped_column(sa.ForeignKey("Users.id"), nullable=False)
    student = relationship("User", back_populates="students")

    lesson_id: Mapped[int] = mapped_column(sa.ForeignKey("Lessons.id"), nullable=False)
    lesson = relationship("Lesson", back_populates="check")

    comment: Mapped[str] = mapped_column(sa.String, nullable=True)
    awards: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Awards.id"), nullable=True)

    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime, nullable=False)
    # связь один-ко-многим с таблицей TrainingCheck
    training_data = relationship("TrainingCheck", back_populates="check")


class TrainingCheck(Base):
    '''
    Модель: данные тренировки.
    '''
    __tablename__ = "TrainingChecks"
    check_id: Mapped[int] = mapped_column(sa.ForeignKey("Checks.id"), primary_key=True)
    check = relationship("Check", back_populates="training_data")

    training_id: Mapped[int] = mapped_column(sa.ForeignKey("Trainings.id"), primary_key=True)
    training = relationship("Training", back_populates="check_data")

    repetitions: Mapped[int] = mapped_column(sa.Integer, nullable=True)
    assessment: Mapped[int] = mapped_column(sa.Integer, nullable=True)
