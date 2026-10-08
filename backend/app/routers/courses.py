from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import Course, CourseEnrollment, User
from app.schemas.entities import (
    CourseResponse, CourseCreate, CourseUpdate,
    EnrollmentCreate, EnrollmentResponse
)
from app.utils.security import get_current_user
from app.utils.rate_limiter import check_form_rate_limit
from app.utils.email import send_notification_email

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("", response_model=List[CourseResponse])
def get_courses(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Course)
    if active_only:
        query = query.filter(Course.is_active == True)
    return query.order_by(Course.order.asc(), Course.id.asc()).all()

@router.get("/{slug}", response_model=CourseResponse)
def get_course_by_slug(slug: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.slug == slug).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(payload: CourseCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    existing = db.query(Course).filter(Course.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Course slug already exists")
    course = Course(**payload.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

@router.put("/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, payload: CourseUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(course, key, val)
    db.commit()
    db.refresh(course)
    return course

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return None

# --- Enrollments ---
@router.post("/enroll", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
def enroll_course(payload: EnrollmentCreate, request: Request, db: Session = Depends(get_db)):
    check_form_rate_limit(request)
    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    enrollment = CourseEnrollment(
        course_id=payload.course_id,
        student_name=payload.student_name,
        student_email=payload.student_email,
        student_phone=payload.student_phone,
        notes=payload.notes
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)

    # Email notification
    send_notification_email(
        subject=f"New Enrollment: {course.title} by {payload.student_name}",
        body=f"<p>Student <b>{payload.student_name}</b> ({payload.student_email}, {payload.student_phone}) enrolled for course <b>{course.title}</b>.</p><p>Notes: {payload.notes or 'None'}</p>"
    )
    return enrollment

@router.get("/admin/enrollments", response_model=List[EnrollmentResponse])
def get_enrollments(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(CourseEnrollment).order_by(CourseEnrollment.id.desc()).all()

@router.put("/admin/enrollments/{enrollment_id}/status")
def update_enrollment_status(enrollment_id: int, status_val: str, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    enrollment = db.query(CourseEnrollment).filter(CourseEnrollment.id == enrollment_id).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    enrollment.status = status_val
    db.commit()
    return {"message": "Status updated successfully", "status": status_val}
