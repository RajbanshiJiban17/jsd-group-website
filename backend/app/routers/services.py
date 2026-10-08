from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import Service, User
from app.schemas.entities import ServiceResponse, ServiceCreate, ServiceUpdate
from app.utils.security import get_current_user

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceResponse])
def get_services(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Service)
    if active_only:
        query = query.filter(Service.is_active == True)
    return query.order_by(Service.order.asc(), Service.id.asc()).all()

@router.get("/{slug}", response_model=ServiceResponse)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(payload: ServiceCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(Service).filter(Service.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service slug already exists")
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, payload: ServiceUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(service, key, val)
    db.commit()
    db.refresh(service)
    return service

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return None
