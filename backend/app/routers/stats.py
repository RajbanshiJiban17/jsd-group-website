from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import (
    ContactMessage, Project, Service, Course, BlogPost,
    Job, JobApplication, CourseEnrollment, AIConversation, User
)
from app.schemas.entities import DashboardStats
from app.utils.security import get_current_user

router = APIRouter(prefix="/stats", tags=["Dashboard Statistics"])

@router.get("", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    total_inquiries = db.query(ContactMessage).count()
    unread_inquiries = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    total_projects = db.query(Project).count()
    total_services = db.query(Service).count()
    total_courses = db.query(Course).count()
    total_blog_posts = db.query(BlogPost).count()
    total_jobs = db.query(Job).count()
    total_applications = db.query(JobApplication).count()
    total_enrollments = db.query(CourseEnrollment).count()
    total_ai_conversations = db.query(AIConversation).count()

    return DashboardStats(
        total_inquiries=total_inquiries,
        unread_inquiries=unread_inquiries,
        total_projects=total_projects,
        total_services=total_services,
        total_courses=total_courses,
        total_blog_posts=total_blog_posts,
        total_jobs=total_jobs,
        total_applications=total_applications,
        total_enrollments=total_enrollments,
        total_ai_conversations=total_ai_conversations,
    )
