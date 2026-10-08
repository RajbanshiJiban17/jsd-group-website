export interface CompanySettings {
  id?: number;
  company_name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  values: string;
  founder_name: string;
  founder_role: string;
  founder_bio: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  personal_website: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  problem?: string;
  solution?: string;
  features?: string;
  architecture?: string;
  technologies: string;
  results?: string;
  github_url?: string;
  live_demo_url?: string;
  is_featured: boolean;
  order: number;
  created_at?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description?: string;
  benefits?: string;
  technologies: string;
  use_cases?: string;
  order: number;
  is_active: boolean;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  summary: string;
  duration: string;
  level: string;
  curriculum: string;
  instructor: string;
  price: string;
  batch: string;
  is_enrolling: boolean;
  is_active: boolean;
  order: number;
}

export interface CourseEnrollment {
  id: number;
  course_id: number;
  student_name: string;
  student_email: string;
  student_phone: string;
  notes?: string;
  status: string;
  created_at: string;
  course?: Course;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category_id?: number;
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Job {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  description: string;
  requirements: string;
  responsibilities: string;
  is_active: boolean;
}

export interface JobApplication {
  id: number;
  job_id: number;
  name: string;
  email: string;
  phone: string;
  cover_letter?: string;
  cv_url?: string;
  status: string;
  created_at: string;
  job?: Job;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  budget?: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  created_at: string;
}

export interface AIKnowledgeItem {
  id: number;
  category: string;
  title: string;
  content: string;
  keywords?: string;
  is_active: boolean;
}

export interface AISettings {
  id: number;
  welcome_message: string;
  thank_you_message: string;
  unverified_fallback: string;
  verified_only_mode: boolean;
  allow_general_tech_answers: boolean;
  personality_prompt: string;
}

export interface DashboardStats {
  total_inquiries: number;
  unread_inquiries: number;
  total_projects: number;
  total_services: number;
  total_courses: number;
  total_blog_posts: number;
  total_jobs: number;
  total_applications: number;
  total_enrollments: number;
  total_ai_conversations: number;
}
