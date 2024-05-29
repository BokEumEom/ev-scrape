# app/models/vehicle.py
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database import Base

class VehicleSpec(Base):
    __tablename__ = 'vehicle_specs'
    
    id = Column(Integer, primary_key=True, index=True)
    manufacturer = Column(String, nullable=False)  # 제조사
    model = Column(String, nullable=False) # 모델명
    drive_type = Column(String)  # 드라이브 타입
    battery_type = Column(String)  # 배터리 타입
    battery_capacity = Column(Integer) # 배터리 용량
    range_km = Column(Integer)  # 주행 가능 거리
    acceleration = Column(Float)  # 도달 시간 (0-100 km/h)
    weight_kg = Column(Integer)  # 중량
    storage_l = Column(Integer)  # 적재공간
    wheel_size = Column(String)  # 휠 크기
    seating_capacity = Column(Integer)  # 좌석수
    display_inch = Column(Float)  # 디스플레이 크기
    minimum_ground_clearance_mm = Column(Integer)  # 최저 지상고
    width_mm = Column(Integer)  # 전폭
    height_mm = Column(Integer)  # 전고
    length_mm = Column(Integer)  # 전장
    created_at = Column(DateTime, default=func.now())  # 생성 일자
