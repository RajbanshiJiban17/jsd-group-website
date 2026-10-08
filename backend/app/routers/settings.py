from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import CompanySetting, SocialLink, User
from app.schemas.entities import (
    CompanySettingResponse, CompanySettingUpdate,
    SocialLinkResponse, SocialLinkBase
)
from app.utils.security import get_current_user

router = APIRouter(prefix="/settings", tags=["Company Settings"])

@router.get("", response_model=CompanySettingResponse)
def get_company_settings(db: Session = Depends(get_db)):
    setting = db.query(CompanySetting).first()
    if not setting:
        setting = CompanySetting()
        db.add(setting)
        db.commit()
        db.refresh(setting)
    return setting

@router.put("", response_model=CompanySettingResponse)
def update_company_settings(
    payload: CompanySettingUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    setting = db.query(CompanySetting).first()
    if not setting:
        setting = CompanySetting()
        db.add(setting)
    for key, val in payload.model_dump().items():
        setattr(setting, key, val)
    db.commit()
    db.refresh(setting)
    return setting

# Social Links
@router.get("/socials", response_model=List[SocialLinkResponse])
def get_social_links(db: Session = Depends(get_db)):
    return db.query(SocialLink).filter(SocialLink.is_active == True).all()

@router.post("/socials", response_model=SocialLinkResponse)
def add_social_link(payload: SocialLinkBase, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    link = SocialLink(**payload.model_dump())
    db.add(link)
    db.commit()
    db.refresh(link)
    return link

@router.delete("/socials/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_social_link(link_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    link = db.query(SocialLink).filter(SocialLink.id == link_id).first()
    if link:
        db.delete(link)
        db.commit()
    return None
