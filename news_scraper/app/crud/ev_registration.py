from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional, List
from app.models.ev_registration import EVRegistration
from app.schemas.ev_registration import EVRegistrationCreate, EVRegistrationUpdate

async def get_ev_registration(db: AsyncSession, registration_id: int) -> Optional[EVRegistration]:
    result = await db.execute(select(EVRegistration).filter(EVRegistration.id == registration_id))
    return result.scalars().first()

async def get_ev_registrations(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[EVRegistration]:
    result = await db.execute(select(EVRegistration).offset(skip).limit(limit))
    return result.scalars().all()

async def get_ev_registrations_by_date(db: AsyncSession, year: Optional[int] = None, month: Optional[int] = None, region: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[EVRegistration]:
    query = select(EVRegistration)
    if year is not None:
        query = query.where(EVRegistration.year == year)
    if month is not None:
        query = query.where(EVRegistration.month == month)
    if region is not None:
        query = query.where(EVRegistration.region == region)
    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()

async def create_ev_registration(db: AsyncSession, registration: EVRegistrationCreate):
    db_registration = EVRegistration(**registration.dict())
    db.add(db_registration)
    await db.commit()
    await db.refresh(db_registration)
    return db_registration

async def update_ev_registration(db: AsyncSession, registration_id: int, registration: EVRegistrationUpdate):
    result = await db.execute(select(EVRegistration).filter(EVRegistration.id == registration_id))
    db_registration = result.scalars().first()
    if db_registration:
        for key, value in registration.dict().items():
            setattr(db_registration, key, value)
        await db.commit()
        await db.refresh(db_registration)
    return db_registration

async def delete_ev_registration(db: AsyncSession, registration_id: int):
    result = await db.execute(select(EVRegistration).filter(EVRegistration.id == registration_id))
    db_registration = result.scalars().first()
    if db_registration:
        await db.delete(db_registration)
        await db.commit()
    return db_registration
