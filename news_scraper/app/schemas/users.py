# app/schemas/users.py
from pydantic import BaseModel
from typing import List, Generic, TypeVar, Generic, Optional
from pydantic.generics import GenericModel

DataT = TypeVar('DataT')

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True