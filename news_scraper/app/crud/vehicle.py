# # app/crud/vehicle.py
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas.vehicle import VehicleSpec, VehicleSpecCreate
from app.models.vehicle import VehicleSpec
from typing import List

async def create_vehicle_spec(db: AsyncSession, vehicle_spec: VehicleSpecCreate):
    vehicle = VehicleSpec(**vehicle_spec.dict())
    db.add(vehicle)
    await db.commit()
    await db.refresh(vehicle)
    return vehicle

async def get_vehicle_specs(db: AsyncSession):
    result = await db.execute(select(VehicleSpec))
    return result.scalars().all()

async def get_vehicle_specs_by_manufacturer(db: AsyncSession, manufacturer_name: str):
    query = select(VehicleSpec).where(VehicleSpec.manufacturer == manufacturer_name)
    result = await db.execute(query)
    vehicles = result.scalars().all()  # This retrieves all matching records
    return vehicles  # This is now a list, matching the expected response model

async def get_vehicle_spec_by_model(db: AsyncSession, model_name: str):
    query = select(VehicleSpec).where(VehicleSpec.model == model_name)
    result = await db.execute(query)
    vehicle = result.scalars().first()
    if vehicle:
        return vehicle
    else:
        raise HTTPException(status_code=404, detail="Vehicle not found")

async def update_vehicle_spec(db: AsyncSession, vehicle_id: int, spec_update: VehicleSpecCreate):
    vehicle = await db.get(VehicleSpec, vehicle_id)
    if vehicle:
        for key, value in spec_update.dict(exclude_unset=True).items():
            setattr(vehicle, key, value)
        await db.commit()
        return vehicle
    return None

async def delete_vehicle_spec(db: AsyncSession, vehicle_id: int):
    vehicle = await db.get(VehicleSpec, vehicle_id)
    if vehicle:
        await db.delete(vehicle)
        await db.commit()
        return vehicle
    return None
