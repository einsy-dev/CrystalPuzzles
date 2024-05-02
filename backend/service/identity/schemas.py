from typing import List

from pydantic import Field

from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from pydantic import EmailStr, field_validator

from core.schemas.base import BaseModel, BaseFilterSchema


# region ---------------------------------- Auth-------------------------------------
class UserInfoSchema(BaseModel):
    """ Схема информации о пользователе """
    id: int
    email: str
    deleted: bool
    password_hash: str
    role: str


class AuthExceptionSchema(BaseModel):
    """ Схема ошибки """
    status_code: int
    detail: str
    headers: Optional[dict[str, str]] = Field(default=None)


class TokenInfoSchema(BaseModel):
    """Схема информации о токене."""
    access_token: str
    token_type: str = Field(default="Bearer")


class LogoutResponseSchema(BaseModel):
    """Ответ при выходе из учетной записи."""
    message: str = Field(default="Вы успешно вышли из учетной записи.")


# endregion -------------------------------------------------------------------------

# region --------------------------------- User -------------------------------------

class CreateUserSchema(BaseModel):
    """ Валидация регистрационных данных """
    email: EmailStr
    password: str
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime] = None
    is_man: bool = True
    contact: Optional[str] = None
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)

    @field_validator('password')
    def validate_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value

    @field_validator('birthday')
    def validate_birthday(cls, value):
        if value is not None:
            return value.replace(tzinfo=None)


class EditUserSchema(BaseModel):
    """ Валидация редактирования данных пользователя """
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime] = None
    is_man: Optional[bool] = True
    contact: Optional[str] = None
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
    email: str | None = Field(default=None, hidden=True)
    id: int | None = Field(default=None, hidden=True)

    @field_validator('birthday')
    def validate_birthday(cls, value):
        if value is not None:
            return value.replace(tzinfo=None)


class UserShortSchemaForTable(BaseModel):
    """ Формирует ответ с деталями о пользователе """
    id: int
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime]
    is_man: Optional[bool] = True
    contact: Optional[str] = None


class UserSchemaForTable(UserShortSchemaForTable):
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    role: str
    deleted: bool


class UserViewSchemaForPage(BaseModel):
    page: int
    max_page_count: int
    count_records: int
    records: List[UserSchemaForTable]


class UserFilterSchema(BaseFilterSchema):
    pass


class UserChangePasswordSchema(BaseModel):
    """ Валидирует старый и новый пароль """
    old_password: str
    new_password: str

    @field_validator('new_password')
    def validate_new_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value


class UserVerifiedEmailCode(BaseModel):
    """ Валидация кода верификации email """
    code: int

    @field_validator("code")
    def validate_code(cls, value):
        if not int(value) > 4 or int(value) < 4:
            raise HTTPException(status_code=400, detail={"error": "Code must be 4 digits"})
        else:
            return value


class PhotoReadSchema(BaseModel):
    """ Формирует ответ с деталями о фото пользователя """
    photo: Optional[bytes] = None


# endregion -------------------------------------------------------------------------

# region -------------------------------- Token -------------------------------------

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

# endregion -------------------------------------------------------------------------
