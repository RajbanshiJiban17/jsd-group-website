from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import Testimonial, TeamMember, SeoSetting, User
from app.schemas.entities import (
    TestimonialResponse, TestimonialBase,
    TeamMemberResponse, TeamMemberBase,
    SeoSettingResponse, SeoSettingBase
)
from app.utils.security import get_current_user

# Testimonials Router
testimonials_router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@testimonials_router.get("", response_model=List[TestimonialResponse])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_active == True).all()

@testimonials_router.post("", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(payload: TestimonialBase, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    t = Testimonial(**payload.model_dump())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

@testimonials_router.delete("/{t_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(t_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    t = db.query(Testimonial).filter(Testimonial.id == t_id).first()
    if t:
        db.delete(t)
        db.commit()
    return None

# Team Router
team_router = APIRouter(prefix="/team", tags=["Team"])

@team_router.get("", response_model=List[TeamMemberResponse])
def get_team(db: Session = Depends(get_db)):
    return db.query(TeamMember).filter(TeamMember.is_active == True).order_by(TeamMember.order.asc()).all()

@team_router.post("", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def add_team_member(payload: TeamMemberBase, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    tm = TeamMember(**payload.model_dump())
    db.add(tm)
    db.commit()
    db.refresh(tm)
    return tm

@team_router.delete("/{tm_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(tm_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    tm = db.query(TeamMember).filter(TeamMember.id == tm_id).first()
    if tm:
        db.delete(tm)
        db.commit()
    return None

# SEO Router
seo_router = APIRouter(prefix="/seo", tags=["SEO"])

@seo_router.get("", response_model=List[SeoSettingResponse])
def get_seo_settings(db: Session = Depends(get_db)):
    return db.query(SeoSetting).all()

@seo_router.post("", response_model=SeoSettingResponse)
def save_seo_setting(payload: SeoSettingBase, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(SeoSetting).filter(SeoSetting.page_route == payload.page_route).first()
    if existing:
        for k, v in payload.model_dump().items():
            setattr(existing, k, v)
        db.commit()
        db.refresh(existing)
        return existing
    new_seo = SeoSetting(**payload.model_dump())
    db.add(new_seo)
    db.commit()
    db.refresh(new_seo)
    return new_seo
