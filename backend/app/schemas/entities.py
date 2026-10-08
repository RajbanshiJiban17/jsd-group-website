from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# --- Token & Auth ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# --- User ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "admin"
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# --- Company Settings ---
class CompanySettingBase(BaseModel):
    company_name: str = "JSD Group"
    tagline: str = "Building Intelligent Solutions for a Digital Future."
    description: str
    mission: str
    vision: str
    values: str
    founder_name: str = "Jiban Chaudhary"
    founder_role: str = "Founder & Technology Lead"
    founder_bio: str
    location: str = "Nepalgunj-10, Adarshnagar, Banke, Nepal"
    phone: str = "9868837762"
    email: str = "jibanchy233@gmail.com"
    github: str = "RajbanshiJiban17"
    linkedin: str = "linkedin.com/in/jiban-chaudhary-732698384"
    personal_website: str = "JibanChaudhary1.com.np"

class CompanySettingUpdate(CompanySettingBase):
    pass

class CompanySettingResponse(CompanySettingBase):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

# --- Projects ---
class ProjectImageResponse(BaseModel):
    id: int
    image_url: str
    caption: Optional[str] = None
    order: int = 0
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    slug: str
    summary: str
    problem: Optional[str] = None
    solution: Optional[str] = None
    features: Optional[str] = None
    architecture: Optional[str] = None
    technologies: str
    results: Optional[str] = None
    github_url: Optional[str] = None
    live_demo_url: Optional[str] = None
    is_featured: bool = True
    order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    features: Optional[str] = None
    architecture: Optional[str] = None
    technologies: Optional[str] = None
    results: Optional[str] = None
    github_url: Optional[str] = None
    live_demo_url: Optional[str] = None
    is_featured: Optional[bool] = None
    order: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime
    images: List[ProjectImageResponse] = []
    class Config:
        from_attributes = True

# --- Services ---
class ServiceBase(BaseModel):
    title: str
    slug: str
    icon: str = "Brain"
    short_description: str
    full_description: Optional[str] = None
    benefits: Optional[str] = None
    technologies: str
    use_cases: Optional[str] = None
    order: int = 0
    is_active: bool = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    icon: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    benefits: Optional[str] = None
    technologies: Optional[str] = None
    use_cases: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

# --- Courses ---
class CourseBase(BaseModel):
    title: str
    slug: str
    summary: str
    duration: str
    level: str = "Beginner to Advanced"
    curriculum: str
    instructor: str = "Jiban Chaudhary"
    price: str = "Inquire for current batch fee"
    batch: str = "Upcoming Spring Batch"
    is_enrolling: bool = True
    is_active: bool = True
    order: int = 0

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    duration: Optional[str] = None
    level: Optional[str] = None
    curriculum: Optional[str] = None
    instructor: Optional[str] = None
    price: Optional[str] = None
    batch: Optional[str] = None
    is_enrolling: Optional[bool] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None

class CourseResponse(CourseBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

# --- Course Enrollment ---
class EnrollmentCreate(BaseModel):
    course_id: int
    student_name: str
    student_email: EmailStr
    student_phone: str
    notes: Optional[str] = None

class EnrollmentResponse(BaseModel):
    id: int
    course_id: int
    student_name: str
    student_email: str
    student_phone: str
    notes: Optional[str] = None
    status: str
    created_at: datetime
    course: Optional[CourseResponse] = None
    class Config:
        from_attributes = True

# --- Blog ---
class BlogCategoryBase(BaseModel):
    name: str
    slug: str

class BlogCategoryResponse(BlogCategoryBase):
    id: int
    class Config:
        from_attributes = True

class BlogPostBase(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    category_id: Optional[int] = None
    featured_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    canonical_url: Optional[str] = None
    is_published: bool = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    category_id: Optional[int] = None
    featured_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    canonical_url: Optional[str] = None
    is_published: Optional[bool] = None

class BlogPostResponse(BlogPostBase):
    id: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    category: Optional[BlogCategoryResponse] = None
    class Config:
        from_attributes = True

# --- Jobs & Careers ---
class JobBase(BaseModel):
    title: str
    slug: str
    department: str = "Engineering"
    location: str = "Nepalgunj, Banke / Hybrid"
    type: str = "Full-Time"
    experience_level: str = "Entry-Level / Mid"
    description: str
    requirements: str
    responsibilities: str
    is_active: bool = True

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    experience_level: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    responsibilities: Optional[str] = None
    is_active: Optional[bool] = None

class JobResponse(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class JobApplicationCreate(BaseModel):
    job_id: int
    name: str
    email: EmailStr
    phone: str
    cover_letter: Optional[str] = None
    cv_url: Optional[str] = None

class JobApplicationResponse(BaseModel):
    id: int
    job_id: int
    name: str
    email: str
    phone: str
    cover_letter: Optional[str] = None
    cv_url: Optional[str] = None
    status: str
    created_at: datetime
    job: Optional[JobResponse] = None
    class Config:
        from_attributes = True

# --- Contact ---
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service_interest: Optional[str] = None
    budget: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    service_interest: Optional[str] = None
    budget: Optional[str] = None
    message: str
    is_read: bool
    is_replied: bool
    created_at: datetime
    class Config:
        from_attributes = True

# --- Testimonial ---
class TestimonialBase(BaseModel):
    client_name: str
    client_role: str
    company: str
    content: str
    rating: int = 5
    is_active: bool = True

class TestimonialResponse(TestimonialBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# --- Team ---
class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    order: int = 0
    is_active: bool = True

class TeamMemberResponse(TeamMemberBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# --- Social Link ---
class SocialLinkBase(BaseModel):
    platform: str
    url: str
    is_active: bool = True

class SocialLinkResponse(SocialLinkBase):
    id: int
    class Config:
        from_attributes = True

# --- SEO ---
class SeoSettingBase(BaseModel):
    page_route: str
    title: str
    description: str
    keywords: Optional[str] = None
    og_image: Optional[str] = None

class SeoSettingResponse(SeoSettingBase):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

# --- AI Knowledge & Chat ---
class AIKnowledgeBase(BaseModel):
    category: str
    title: str
    content: str
    keywords: Optional[str] = None
    is_active: bool = True

class AIKnowledgeCreate(AIKnowledgeBase):
    pass

class AIKnowledgeUpdate(BaseModel):
    category: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    keywords: Optional[str] = None
    is_active: Optional[bool] = None

class AIKnowledgeResponse(AIKnowledgeBase):
    id: int
    updated_at: datetime
    class Config:
        from_attributes = True

class AIChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class AIChatResponse(BaseModel):
    answer: str
    sources_used: List[str] = []
    session_id: str

class AISettingUpdate(BaseModel):
    welcome_message: Optional[str] = None
    thank_you_message: Optional[str] = None
    unverified_fallback: Optional[str] = None
    verified_only_mode: Optional[bool] = None
    allow_general_tech_answers: Optional[bool] = None
    personality_prompt: Optional[str] = None

class AISettingResponse(BaseModel):
    id: int
    welcome_message: str
    thank_you_message: str
    unverified_fallback: str
    verified_only_mode: bool
    allow_general_tech_answers: bool
    personality_prompt: str
    updated_at: datetime
    class Config:
        from_attributes = True

# --- Dashboard Stats ---
class DashboardStats(BaseModel):
    total_inquiries: int
    unread_inquiries: int
    total_projects: int
    total_services: int
    total_courses: int
    total_blog_posts: int
    total_jobs: int
    total_applications: int
    total_enrollments: int
    total_ai_conversations: int
