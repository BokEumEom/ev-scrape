# app/api/v1/endpoints/vehicle.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.vehicle_scrapers.tesla_scraper import scrape_tesla_specs
from typing import List, AsyncGenerator
from app import crud, schemas
from app.config import get_logger
from app.database import SessionLocal

logger = get_logger()

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.post("/scrape", response_model=schemas.VehicleSpec)
async def scrape_vehicle_spec(model_url: str, db: AsyncSession = Depends(get_db)):
    scraped_data = await scrape_tesla_specs(model_url)  # Now the function accepts a URL
    vehicle_spec_data = schemas.VehicleSpecCreate(**scraped_data)
    return await crud.create_vehicle_spec(db=db, vehicle_spec=vehicle_spec_data)

@router.get("/{manufacturer}", response_model=List[schemas.VehicleSpec])
async def read_vehicle_specs_by_manufacturer(manufacturer: str, db: AsyncSession = Depends(get_db)):
    vehicle_specs = await crud.get_vehicle_specs_by_manufacturer(db, manufacturer)
    if not vehicle_specs:
        raise HTTPException(status_code=404, detail="No vehicle specifications found for this manufacturer")
    return vehicle_specs

@router.get("/{model_name}", response_model=schemas.VehicleSpec)
async def read_vehicle_spec_by_model(model_name: str, db: AsyncSession = Depends(get_db)):
    vehicle = await crud.get_vehicle_spec_by_model(db=db, model_name=model_name)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle specification not found")
    return vehicle

@router.get("/", response_model=List[schemas.VehicleSpec])
async def read_all_vehicle_specs(db: AsyncSession = Depends(get_db)):
    return await crud.get_vehicle_specs(db=db)