from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import Job, JobApplication, User
from app.schemas.entities import (
    JobResponse, JobCreate, JobUpdate,
    JobApplicationCreate, JobApplicationResponse
)
from app.utils.security import get_current_user
from app.utils.rate_limiter import check_form_rate_limit
from app.utils.email import send_notification_email

router = APIRouter(prefix="/careers", tags=["Careers"])

@router.get("", response_model=List[JobResponse])
def get_jobs(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Job)
    if active_only:
        query = query.filter(Job.is_active == True)
    return query.order_by(Job.id.desc()).all()

@router.get("/{slug}", response_model=JobResponse)
def get_job_by_slug(slug: str, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.slug == slug).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found")
    return job

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(payload: JobCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(Job).filter(Job.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Job slug already exists")
    job = Job(**payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

@router.put("/{job_id}", response_model=JobResponse)
def update_job(job_id: int, payload: JobUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(job, key, val)
    db.commit()
    db.refresh(job)
    return job

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return None

# --- Applications ---
@router.post("/apply", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_for_job(payload: JobApplicationCreate, request: Request, db: Session = Depends(get_db)):
    check_form_rate_limit(request)
    job = db.query(Job).filter(Job.id == payload.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    app_entry = JobApplication(
        job_id=payload.job_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        cover_letter=payload.cover_letter,
        cv_url=payload.cv_url
    )
    db.add(app_entry)
    db.commit()
    db.refresh(app_entry)

    send_notification_email(
        subject=f"New Job Application: {job.title} from {payload.name}",
        body=f"<p>Candidate <b>{payload.name}</b> ({payload.email}, {payload.phone}) applied for <b>{job.title}</b>.</p><p>CV URL: {payload.cv_url or 'None provided'}</p><p>Cover letter: {payload.cover_letter or 'None'}</p>"
    )
    return app_entry

@router.get("/admin/applications", response_model=List[JobApplicationResponse])
def get_applications(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(JobApplication).order_by(JobApplication.id.desc()).all()

@router.put("/admin/applications/{app_id}/status")
def update_application_status(app_id: int, status_val: str, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    app_item = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app_item:
        raise HTTPException(status_code=404, detail="Application not found")
    app_item.status = status_val
    db.commit()
    return {"message": "Status updated", "status": status_val}
