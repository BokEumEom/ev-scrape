# app/schemas/ev_registration.py
from pydantic import BaseModel

class EVRegistrationBase(BaseModel):
    region: str
    year: int
    month: int
    count: int

class EVRegistrationCreate(EVRegistrationBase):
    pass

class EVRegistrationUpdate(EVRegistrationBase):
    pass

class EVRegistration(EVRegistrationBase):
    id: int

    class Config:
        orm_mode = True
