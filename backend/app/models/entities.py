import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
)
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="admin") # "admin", "editor"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class CompanySetting(Base):
    __tablename__ = "company_settings"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), default="JSD Group")
    tagline = Column(String(255), default="Building Intelligent Solutions for a Digital Future.")
    description = Column(Text, default="JSD Group is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions and digital products.")
    mission = Column(Text, default="To build practical technology that creates measurable value.")
    vision = Column(Text, default="To become a trusted technology partner for businesses in Nepal and beyond.")
    values = Column(Text, default="Innovation, Quality, Transparency, Customer Success, Continuous Learning, Responsible Technology")
    founder_name = Column(String(255), default="Jiban Chaudhary")
    founder_role = Column(String(255), default="Founder & Technology Lead")
    founder_bio = Column(Text, default="Experienced technology specialist in Python, Data Science, Machine Learning, FastAPI, Web Development and intelligent enterprise solutions.")
    location = Column(String(255), default="Nepalgunj-10, Adarshnagar, Banke, Nepal")
    phone = Column(String(100), default="9868837762")
    email = Column(String(255), default="jibanchy233@gmail.com")
    github = Column(String(255), default="RajbanshiJiban17")
    linkedin = Column(String(255), default="linkedin.com/in/jiban-chaudhary-732698384")
    personal_website = Column(String(255), default="JibanChaudhary1.com.np")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    problem = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    features = Column(Text, nullable=True) # JSON or newline separated
    architecture = Column(Text, nullable=True)
    technologies = Column(String(500), nullable=False) # Comma separated
    results = Column(Text, nullable=True)
    github_url = Column(String(500), nullable=True)
    live_demo_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")

class ProjectImage(Base):
    __tablename__ = "project_images"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(255), nullable=True)
    order = Column(Integer, default=0)

    project = relationship("Project", back_populates="images")

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    icon = Column(String(100), default="Brain")
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=True)
    benefits = Column(Text, nullable=True)
    technologies = Column(String(500), nullable=False)
    use_cases = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    duration = Column(String(100), nullable=False) # e.g. "8 Weeks", "12 Weeks"
    level = Column(String(100), default="Beginner to Advanced")
    curriculum = Column(Text, nullable=False) # Detailed syllabus modules
    instructor = Column(String(255), default="Jiban Chaudhary")
    price = Column(String(100), default="Inquire for current batch fee")
    batch = Column(String(100), default="Upcoming Spring Batch")
    is_enrolling = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    enrollments = relationship("CourseEnrollment", back_populates="course", cascade="all, delete-orphan")

class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    student_name = Column(String(255), nullable=False)
    student_email = Column(String(255), nullable=False)
    student_phone = Column(String(100), nullable=False)
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="pending") # pending, confirmed, cancelled
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    course = relationship("Course", back_populates="enrollments")

class BlogCategory(Base):
    __tablename__ = "blog_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)

    posts = relationship("BlogPost", back_populates="category")

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False) # Markdown content
    category_id = Column(Integer, ForeignKey("blog_categories.id", ondelete="SET NULL"), nullable=True)
    featured_image = Column(String(500), nullable=True)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    canonical_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=True)
    published_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    category = relationship("BlogCategory", back_populates="posts")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    department = Column(String(100), default="Engineering")
    location = Column(String(100), default="Nepalgunj, Banke / Hybrid")
    type = Column(String(50), default="Full-Time") # Full-Time, Internship, Part-Time
    experience_level = Column(String(100), default="Entry-Level / Mid")
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(100), nullable=False)
    cover_letter = Column(Text, nullable=True)
    cv_url = Column(String(500), nullable=True)
    status = Column(String(50), default="new") # new, reviewed, interviewed, rejected, accepted
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    job = relationship("Job", back_populates="applications")

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(100), nullable=True)
    company = Column(String(255), nullable=True)
    service_interest = Column(String(255), nullable=True)
    budget = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    is_replied = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    client_role = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    bio = Column(Text, nullable=True)
    photo_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(100), nullable=False) # Facebook, LinkedIn, GitHub, Instagram, YouTube
    url = Column(String(500), nullable=False)
    is_active = Column(Boolean, default=True)

class SeoSetting(Base):
    __tablename__ = "seo_settings"

    id = Column(Integer, primary_key=True, index=True)
    page_route = Column(String(100), unique=True, nullable=False) # "/", "/about", "/services", etc.
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    keywords = Column(Text, nullable=True)
    og_image = Column(String(500), nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, default=0)
    mime_type = Column(String(100), default="application/octet-stream")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AIKnowledge(Base):
    __tablename__ = "ai_knowledge"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False, index=True) # Company, Founder, Services, Projects, Courses, Blog, Careers, Contact, FAQ
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    keywords = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")

class AIMessage(Base):
    __tablename__ = "ai_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(50), nullable=False) # "user", "assistant"
    message = Column(Text, nullable=False)
    sources_used = Column(Text, nullable=True) # JSON list or comma separated categories
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("AIConversation", back_populates="messages")

class AISetting(Base):
    __tablename__ = "ai_settings"

    id = Column(Integer, primary_key=True, index=True)
    welcome_message = Column(Text, default="नमस्ते! म Jeesa AI, JSD Group को AI Assistant हुँ। तपाईंलाई के help चाहिएको छ?")
    thank_you_message = Column(Text, default="Welcome! 😊 अरू कुनै जानकारी चाहिएको भए भन्नुहोस्, म सहयोग गर्छु।")
    unverified_fallback = Column(Text, default="मसँग यसबारे verified जानकारी छैन। तपाईं चाहनुहुन्छ भने JSD Group को team सँग directly contact गर्न सक्नुहुन्छ।")
    verified_only_mode = Column(Boolean, default=True)
    allow_general_tech_answers = Column(Boolean, default=True)
    personality_prompt = Column(Text, default="You are Jeesa AI, official assistant of JSD Group. Respond respectfully and concisely in Nepali with natural technical English words.")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
