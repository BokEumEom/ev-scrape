# app/api/v1/endpoints/vehicle_registration.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, AsyncGenerator
from app import schemas
from app.crud import ev_registration as crud
from app.config import get_logger
from app.database import SessionLocal
from app.utils.xls_to_database import load_excel_to_db

logger = get_logger()

router = APIRouter()

# Dependency injection for AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.post("/upload-excel")
async def upload_excel(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    file_location = f"/tmp/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    try:
        from app.utils.xls_to_database import load_excel_to_db
        await load_excel_to_db(file_location, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"success": True, "filename": file.filename}

@router.get("", response_model=List[schemas.EVRegistration])
async def get_registrations(year: Optional[int] = None, month: Optional[int] = None, region: Optional[str] = None, skip: int = 0, limit: Optional[int] = None, db: AsyncSession = Depends(get_db)):
    return await crud.get_ev_registrations_by_date(db, year=year, month=month, region=region, skip=skip, limit=limit)

@router.post("", response_model=schemas.EVRegistration)
async def create_registration(registration: schemas.EVRegistrationCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_ev_registration(db, registration)

@router.get("/{registration_id}", response_model=schemas.EVRegistration)
async def read_registration(registration_id: int, db: AsyncSession = Depends(get_db)):
    db_registration = await crud.get_ev_registration(db, registration_id)
    if db_registration is None:
        raise HTTPException(status_code=404, detail="EV registration not found")
    return db_registration

@router.put("/{registration_id}", response_model=schemas.EVRegistration)
async def update_registration(registration_id: int, registration: schemas.EVRegistrationUpdate, db: AsyncSession = Depends(get_db)):
    db_registration = await crud.get_ev_registration(db, registration_id)
    if db_registration is None:
        raise HTTPException(status_code=404, detail="EV registration not found")
    return await crud.update_ev_registration(db, registration_id, registration)

@router.delete("/{registration_id}", response_model=schemas.EVRegistration)
async def delete_registration(registration_id: int, db: AsyncSession = Depends(get_db)):
    db_registration = await crud.get_ev_registration(db, registration_id)
    if db_registration is None:
        raise HTTPException(status_code=404, detail="EV registration not found")
    return await crud.delete_ev_registration(db, registration_id)
