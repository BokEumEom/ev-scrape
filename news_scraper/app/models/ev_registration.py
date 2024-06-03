# app/models/vehicle_registration.py
from sqlalchemy import Column, Integer, String
from app.database import Base

class EVRegistration(Base):
    __tablename__ = "ev_registrations"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String, index=True)
    year = Column(Integer)
    month = Column(Integer)
    count = Column(Integer)
