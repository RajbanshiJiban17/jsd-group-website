import {
  CompanySettings, Project, Service, Course, BlogPost,
  Job, ContactMessage, AIKnowledgeItem, AISettings, DashboardStats, CourseEnrollment, JobApplication
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

// Default authentic company state
export const DEFAULT_COMPANY: CompanySettings = {
  company_name: "JSD Group",
  tagline: "Building Intelligent Solutions for a Digital Future.",
  description: "JSD Group is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions and digital products.",
  mission: "To build practical technology that creates measurable value.",
  vision: "To become a trusted technology partner for businesses in Nepal and beyond.",
  values: "Innovation, Quality, Transparency, Customer Success, Continuous Learning, Responsible Technology",
  founder_name: "Jiban Chaudhary",
  founder_role: "Founder & Technology Lead",
  founder_bio: "Experienced technology specialist in Python, Data Science, Machine Learning, FastAPI, Web Development and intelligent enterprise solutions.",
  location: "Nepalgunj-10, Adarshnagar, Banke, Nepal",
  phone: "9868837762",
  email: "jibanchy233@gmail.com",
  github: "RajbanshiJiban17",
  linkedin: "linkedin.com/in/jiban-chaudhary-732698384",
  personal_website: "JibanChaudhary1.com.np"
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "RetailIQ Nepal",
    slug: "retailiq-nepal",
    summary: "Business analytics and inventory intelligence platform tailored for small and medium enterprises (SMEs) in Nepal.",
    problem: "Traditional SMEs in Nepal struggle with inventory tracking, unpredictability in stock depletion, and fragmented sales records stored in manual notebooks or disjointed spreadsheets.",
    solution: "A centralized analytics dashboard offering real-time sales reporting, dead-stock detection, predictive reorder points, and automated cashflow summaries.",
    features: "Sales Analytics\nProduct Performance Matrix\nInventory Insights\nLow Stock Detection & Alerts\nBusiness Dashboard\nAI-assisted Business Insights",
    architecture: "Client: Next.js + Tailwind CSS\nAPI Layer: FastAPI (Python) asynchronous microservices\nDatabase: SQLite / PostgreSQL with SQLAlchemy ORM\nCaching: In-memory analytical cache",
    technologies: "Python, FastAPI, SQLAlchemy, Next.js, TypeScript, Chart.js",
    results: "Empowers SME managers to analyze top-selling inventory within seconds and reduces stockout occurrences by up to 35% through automated alerts.",
    github_url: "https://github.com/RajbanshiJiban17",
    live_demo_url: "https://retailiq.jsdgroup.com",
    is_featured: true,
    order: 1
  },
  {
    id: 2,
    title: "Smart Agriculture Advisor",
    slug: "smart-agriculture-advisor",
    summary: "AI-assisted crop recommendation and disease detection system designed for regional farmers and agrarian cooperatives.",
    problem: "Farmers often suffer heavy crop yield losses due to untimely disease diagnosis and suboptimal fertilizer application unsuitable for local soil parameters.",
    solution: "An intelligent web application where farmers input soil attributes (N, P, K, pH, rainfall) to receive optimal crop selections, along with an image classification pipeline for visual leaf disease detection.",
    features: "Soil-based Crop Recommendation\nPlant Leaf Disease Classifier\nWeather & Seasonal Guidelines\nBilingual Interface (Nepali & English)\nActionable treatment recommendations",
    architecture: "ML Models: Random Forest Crop Predictor & CNN ResNet for disease identification\nBackend: FastAPI REST API service\nFrontend: Responsive Next.js web application",
    technologies: "Python, Scikit-Learn, PyTorch, FastAPI, OpenCV, Next.js",
    results: "Delivered over 94% accuracy in laboratory crop recommendation benchmarks against regional agricultural dataset controls.",
    github_url: "https://github.com/RajbanshiJiban17",
    live_demo_url: "https://smartagri.jsdgroup.com",
    is_featured: true,
    order: 2
  },
  {
    id: 3,
    title: "Employee Churn Prediction",
    slug: "employee-churn-prediction",
    summary: "Machine learning system analyzing organizational HR metrics to forecast employee turnover and identify retention factors.",
    problem: "Unplanned corporate attrition creates severe recruiting expenses and project delivery delays that could be avoided if early warning indicators were spotted.",
    solution: "An end-to-end predictive modeling application that correlates workload metrics, satisfaction indices, evaluation ratings, and tenure to score turnover likelihood.",
    features: "Attrition Probability Scoring\nKey Driver Analysis with SHAP values\nInteractive HR Risk Matrix\nDepartmental Attrition Heatmap\nExportable Risk Assessment Reports",
    architecture: "Data Pipeline: Scikit-Learn and Pandas feature transformation\nPredictive Model: XGBoost & Logistic Regression ensemble\nAPI: FastAPI endpoints serving predictions in sub-100ms",
    technologies: "Python, Scikit-Learn, XGBoost, Pandas, FastAPI, React",
    results: "Achieved 89% ROC-AUC score on employee historical datasets, spotlighting overwork and lack of promotion velocity as primary turnover triggers.",
    github_url: "https://github.com/RajbanshiJiban17",
    live_demo_url: "https://churn.jsdgroup.com",
    is_featured: true,
    order: 3
  },
  {
    id: 4,
    title: "RAG / AI Knowledge System",
    slug: "rag-ai-knowledge-system",
    summary: "Retrieval-Augmented Generation platform that indexes corporate documents and policies to provide hallucination-free answers.",
    problem: "Traditional LLMs make unsupported claims and lack visibility into private enterprise documents, while manual search across PDF files wastes hundreds of employee hours.",
    solution: "A robust RAG engine that parses organizational documentation, generates semantic embeddings, and injects exact cited context into generated answers.",
    features: "Automated Document Chunking & Embedding\nHybrid Vector & Keyword Search\nExact Citation Reference\nHallucination Detection Guardrails\nRole-based Document Security",
    architecture: "Vector Store: SQLite vector / FAISS index\nBackend: FastAPI with LangChain / custom retrieval pipelines\nFrontend: Sleek conversational UI with citation inspector",
    technologies: "Python, FastAPI, LangChain, SQLite, Sentence-Transformers, Next.js",
    results: "Reduces document query lookup time from minutes to under 2 seconds with zero fabrication of unindexed facts.",
    github_url: "https://github.com/RajbanshiJiban17",
    live_demo_url: "https://rag.jsdgroup.com",
    is_featured: true,
    order: 4
  },
  {
    id: 5,
    title: "Jeevan-Sangini AI",
    slug: "jeevan-sangini-ai",
    summary: "An intelligent conversational assistant engineered to provide empathetic, contextual maternal and wellness guidance in regional languages.",
    problem: "Maternal health literacy in underserved regions suffers from lack of immediate, stigma-free access to medically verified maternal healthcare guidance.",
    solution: "A bilingual conversational AI assistant engineered with vetted healthcare information, emergency contact routing, and prenatal milestone tracking.",
    features: "Nepali & English Conversational Support\nTrimester-specific Dietary Guidelines\nVaccination Milestone Scheduler\nEmergency Hospital Directory\nPrivacy-first Architecture",
    architecture: "NLP Pipeline: Custom conversational intents & verified medical knowledge retriever\nBackend: FastAPI asynchronous event loop\nClient: Lightweight PWA optimized for low-bandwidth mobile connections",
    technologies: "Python, FastAPI, SQLite, PWA, Tailwind CSS",
    results: "Provides clear, grounded answers to hundreds of common prenatal health queries with verified clinical safety guardrails.",
    github_url: "https://github.com/RajbanshiJiban17",
    live_demo_url: "https://sangini.jsdgroup.com",
    is_featured: true,
    order: 5
  }
];

export const DEFAULT_SERVICES: Service[] = [
  { id: 1, title: "AI Solutions", slug: "ai-solutions", icon: "Brain", short_description: "Custom artificial intelligence systems, computer vision, and NLP designed for high-impact business applications.", technologies: "Python, PyTorch, TensorFlow, Hugging Face, OpenCV, FastAPI", order: 1, is_active: true },
  { id: 2, title: "AI Automation", slug: "ai-automation", icon: "Bot", short_description: "End-to-end intelligent workflow automation integrating AI models with existing enterprise software.", technologies: "LangChain, LlamaIndex, Python, Webhooks, FastAPI, Celery", order: 2, is_active: true },
  { id: 3, title: "Data Analysis", slug: "data-analysis", icon: "BarChart3", short_description: "Transforming unstructured business metrics into clear visual dashboards, KPI monitors, and actionable insights.", technologies: "Pandas, NumPy, SQL, PowerBI, Metabase, Plotly, DuckDB", order: 3, is_active: true },
  { id: 4, title: "Machine Learning", slug: "machine-learning", icon: "Cpu", short_description: "Predictive modeling, classification, regression, and clustering algorithms trained on real business data.", technologies: "Scikit-Learn, XGBoost, LightGBM, Pandas, MLflow", order: 4, is_active: true },
  { id: 5, title: "Web Development", slug: "web-development", icon: "Globe", short_description: "High-performance web applications built with Next.js, TypeScript, Tailwind CSS, and scalable REST/GraphQL APIs.", technologies: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion", order: 5, is_active: true },
  { id: 6, title: "Software Development", slug: "software-development", icon: "Code2", short_description: "Enterprise software engineering, custom CRM/ERP backends, and microservices built for scalability.", technologies: "Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, Docker", order: 6, is_active: true },
  { id: 7, title: "App Development", slug: "app-development", icon: "Smartphone", short_description: "Cross-platform mobile applications for iOS and Android delivering smooth native performance.", technologies: "React Native, Flutter, REST APIs, SQLite", order: 7, is_active: true },
  { id: 8, title: "Business Automation", slug: "business-automation", icon: "Zap", short_description: "Digital transformation workflows integrating databases, SMS gateways, payment systems, and internal tools.", technologies: "Python, RabbitMQ, Webhooks, REST Integrations", order: 8, is_active: true },
  { id: 9, title: "Digital Marketing", slug: "digital-marketing", icon: "TrendingUp", short_description: "Data-driven SEO, conversion rate optimization, content marketing, and targeted digital acquisition campaigns.", technologies: "Google Analytics 4, Search Console, Technical SEO, Schema Markup", order: 9, is_active: true },
  { id: 10, title: "IT Consulting", slug: "it-consulting", icon: "Compass", short_description: "Strategic technology roadmaps, cloud architecture evaluation, and technology stack selection for growing companies.", technologies: "Cloud Architecture, System Design, Security Audits", order: 10, is_active: true },
  { id: 11, title: "Hardware & IT Services", slug: "hardware-it-services", icon: "Server", short_description: "Local networking infrastructure, server administration, secure backups, and workplace IT support in Banke.", technologies: "Linux Administration, Networking, Firewall, Data Backup Solutions", order: 11, is_active: true },
  { id: 12, title: "IT Training", slug: "it-training", icon: "GraduationCap", short_description: "Rigorous practical training programs in Python, Data Science, Machine Learning, and Web Engineering.", technologies: "Python, SQL, Next.js, Scikit-Learn, FastAPI", order: 12, is_active: true }
];

export const DEFAULT_COURSES: Course[] = [
  {
    id: 1,
    title: "Data Science with Python",
    slug: "data-science-with-python",
    summary: "Master data analysis, exploratory data visualization, statistical testing, and practical predictive modeling using Python.",
    duration: "10 Weeks (60 Hours)",
    level: "Beginner to Intermediate",
    curriculum: "Module 1: Python Core & Functional Foundations\nModule 2: Data Manipulation with NumPy & Pandas\nModule 3: Exploratory Data Analysis & Seaborn Visualizations\nModule 4: Applied Statistics & Probability for Data Science\nModule 5: Scikit-Learn Predictive Modeling\nModule 6: Capstone Real-world Project & Deployment",
    instructor: "Jiban Chaudhary",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 1
  },
  {
    id: 2,
    title: "AI/ML with Python",
    slug: "ai-ml-with-python",
    summary: "Deep dive into machine learning algorithms, neural network foundations, deep learning, and building production AI pipelines.",
    duration: "12 Weeks (72 Hours)",
    level: "Intermediate to Advanced",
    curriculum: "Module 1: Mathematical Foundations of Machine Learning\nModule 2: Regression, Classification & Clustering Algorithms\nModule 3: Ensemble Techniques: Random Forests & XGBoost\nModule 4: Neural Networks & PyTorch Fundamentals\nModule 5: Natural Language Processing & Transformer Basics\nModule 6: Deploying ML Models with FastAPI & Docker",
    instructor: "Jiban Chaudhary",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 2
  },
  {
    id: 3,
    title: "Data Analytics",
    slug: "data-analytics",
    summary: "Learn business metrics analysis, advanced SQL, data cleaning, dashboard creation, and KPI reporting for real businesses.",
    duration: "8 Weeks (48 Hours)",
    level: "Beginner Friendly",
    curriculum: "Module 1: Business Intelligence & KPI Principles\nModule 2: Relational Databases & Advanced SQL Queries\nModule 3: Data Cleaning with Python & Pandas\nModule 4: Building Interactive Dashboards in Metabase & PowerBI\nModule 5: Storytelling with Business Data & Executive Reports\nModule 6: Capstone SME Case Study Analysis",
    instructor: "Jiban Chaudhary",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 3
  },
  {
    id: 4,
    title: "Web Development",
    slug: "web-development",
    summary: "Modern full-stack web engineering using Next.js, React, TypeScript, Tailwind CSS, and Python FastAPI backend APIs.",
    duration: "10 Weeks (60 Hours)",
    level: "All Levels",
    curriculum: "Module 1: Modern HTML5, Responsive CSS & Tailwind CSS\nModule 2: Modern JavaScript (ES6+) & TypeScript Foundations\nModule 3: React 19 & Next.js App Router Architecture\nModule 4: FastAPI REST Backend Engineering & SQLite/PostgreSQL\nModule 5: JWT Authentication, State Management & Security\nModule 6: Production Deployment & Continuous Integration",
    instructor: "Jiban Chaudhary",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 4
  },
  {
    id: 5,
    title: "Python Programming",
    slug: "python-programming",
    summary: "A comprehensive foundation in Python covering object-oriented programming, file systems, APIs, and algorithmic problem solving.",
    duration: "6 Weeks (36 Hours)",
    level: "Absolute Beginner",
    curriculum: "Module 1: Syntax, Variables, Data Types & Control Flow\nModule 2: Functions, Scopes & Modular Programming\nModule 3: Object-Oriented Programming (Classes & Inheritance)\nModule 4: File I/O, Exception Handling & JSON Processing\nModule 5: Working with External REST APIs using Requests/HTTPX\nModule 6: Final Automation Project",
    instructor: "Jiban Chaudhary",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 5
  },
  {
    id: 6,
    title: "Digital Marketing",
    slug: "digital-marketing",
    summary: "Technical SEO, content marketing, performance acquisition, and digital strategy for modern companies and local brands.",
    duration: "6 Weeks (36 Hours)",
    level: "Beginner Friendly",
    curriculum: "Module 1: Principles of Modern Digital Marketing\nModule 2: Technical SEO, Keyword Research & On-page Optimization\nModule 3: Google Search Console & GA4 Performance Tracking\nModule 4: Social Media Content Funnels & Paid Ad Strategies\nModule 5: Conversion Rate Optimization & Landing Page Design\nModule 6: Digital Growth Strategy Pitch",
    instructor: "JSD Digital Team",
    price: "Inquire for batch fee & scholarship",
    batch: "Upcoming Cohort - Admissions Open",
    is_enrolling: true,
    is_active: true,
    order: 6
  }
];

export const DEFAULT_JOBS: Job[] = [
  {
    id: 1,
    title: "Junior Python Developer",
    slug: "junior-python-developer",
    department: "Engineering",
    location: "Nepalgunj, Banke / Hybrid",
    type: "Full-Time",
    experience_level: "0 - 1 Year",
    description: "Join our engineering team to build scalable REST APIs, automated data pipelines, and backend services using Python and FastAPI.",
    requirements: "Solid grasp of Python 3.10+, basic understanding of relational databases (SQL), familiarity with git version control, and enthusiasm for clean code.",
    responsibilities: "Develop backend endpoints, write unit tests, integrate with frontend applications, and maintain database models.",
    is_active: true
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    slug: "data-analyst-intern",
    department: "Data Science",
    location: "Nepalgunj, Banke / Hybrid",
    type: "Internship (3 Months)",
    experience_level: "Entry Level",
    description: "Work directly with client datasets to clean, analyze, visualize, and generate actionable business intelligence dashboards.",
    requirements: "Familiarity with SQL, Python (Pandas/Matplotlib), and spreadsheet modeling. Strong analytical intuition and communication skills.",
    responsibilities: "Assist senior analysts in ETL processes, compile weekly KPI charts, and build automated reporting templates.",
    is_active: true
  },
  {
    id: 3,
    title: "AI/ML Intern",
    slug: "ai-ml-intern",
    department: "AI Research",
    location: "Nepalgunj, Banke / Hybrid",
    type: "Internship (3 Months)",
    experience_level: "Entry Level",
    description: "Assist in researching, training, and benchmarking machine learning and computer vision models for regional client solutions.",
    requirements: "Understanding of basic ML algorithms (Regression, Random Forests), hands-on Python experience, and theoretical curiosity.",
    responsibilities: "Prepare dataset annotations, evaluate benchmark models, write experimental logs, and integrate APIs.",
    is_active: true
  },
  {
    id: 4,
    title: "Backend Developer",
    slug: "backend-developer",
    department: "Engineering",
    location: "Nepalgunj, Banke / Hybrid",
    type: "Full-Time",
    experience_level: "1 - 3 Years",
    description: "Architect high-performance APIs, database schemas, authentication systems, and cloud background workers.",
    requirements: "Proficiency in FastAPI/Django/Flask, SQLAlchemy, PostgreSQL, Docker, and Redis caching.",
    responsibilities: "Lead API design, implement robust security protocols, optimize query performance, and ensure 99.9% uptime.",
    is_active: true
  },
  {
    id: 5,
    title: "Frontend Developer",
    slug: "frontend-developer",
    department: "Product",
    location: "Nepalgunj, Banke / Hybrid",
    type: "Full-Time",
    experience_level: "1 - 2 Years",
    description: "Create responsive, accessible, and visually stunning web interfaces using Next.js, React, TypeScript, and modern CSS.",
    requirements: "Strong experience with Next.js App Router, Tailwind CSS, state management, and modern component design patterns.",
    responsibilities: "Translate design prototypes into responsive code, integrate REST APIs, and optimize Core Web Vitals.",
    is_active: true
  },
  {
    id: 6,
    title: "Digital Marketing Intern",
    slug: "digital-marketing-intern",
    department: "Growth",
    location: "Nepalgunj, Banke / Remote",
    type: "Internship (3 Months)",
    experience_level: "Entry Level",
    description: "Help expand JSD Group's digital presence through technical blog writing, SEO optimization, and social media storytelling.",
    requirements: "Strong written communication in English and Nepali, understanding of basic SEO, and creative flair.",
    responsibilities: "Draft tech tutorials, optimize metadata, analyze social engagement metrics, and coordinate marketing materials.",
    is_active: true
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Practical Machine Learning for Businesses in Nepal: Moving Beyond the Hype",
    slug: "practical-machine-learning-nepal",
    summary: "How Nepali enterprises and SMEs can leverage practical predictive models to reduce inventory losses and retain valuable customers.",
    content: "Artificial Intelligence and Machine Learning often sound like abstract buzzwords, but in real enterprise settings, their value is concrete and measurable.\n\n### The Real Business Bottlenecks\nMost growing businesses in Nepal face two constant friction points:\n1. **Unpredictable Inventory Depletion**: Capital tied up in stagnant stock while high-demand items run dry.\n2. **Customer Churn**: Losing valuable recurring clients without understanding the early warning signs.\n\n### Practical Predictive Systems\nBy training algorithms on historical sales transactions and customer interaction logs, organizations can forecast demand curves weeks in advance. Rather than waiting for monthly manual reviews, predictive intelligence flags items approaching threshold depletion automatically.\n\nAt JSD Group, our core philosophy is **practical technology that creates measurable value**. We build targeted, production-ready AI solutions that integrate seamlessly with your day-to-day workflow.",
    is_published: true,
    published_at: "2026-03-15T00:00:00Z",
    category: { id: 1, name: "AI & Machine Learning", slug: "ai-machine-learning" }
  },
  {
    id: 2,
    title: "Why Modern Full-Stack Architecture Matters: Next.js + FastAPI",
    slug: "nextjs-fastapi-fullstack-architecture",
    summary: "An engineering deep-dive into why combining Next.js with Python FastAPI yields the ideal balance of frontend speed and backend analytical power.",
    content: "When designing serious enterprise digital products, technology stack selection dictates both development velocity and long-term maintainability.\n\n### The Power of Next.js on the Frontend\nNext.js provides server-side rendering, sub-second route transitions, and premier Core Web Vitals performance out of the box. For business websites, search engine discoverability (SEO) and instant loading on mobile devices directly influence conversion rates.\n\n### Why FastAPI is the Premier Backend for AI & Data\nPython is the undisputed leader in data science and artificial intelligence. By pairing FastAPI with SQLAlchemy:\n- **Asynchronous Throughput**: High concurrency handling powered by Starlette and AnyIO.\n- **Strict Data Validation**: Pydantic models eliminate data mutation bugs before they hit the database.\n- **Native AI Pipeline Integration**: Python models run in the same native environment without heavy inter-process IPC overhead.\n\nThis decoupled architecture allows the user interface to evolve rapidly while backend data pipelines remain rock-solid and secure.",
    is_published: true,
    published_at: "2026-03-28T00:00:00Z",
    category: { id: 2, name: "Web Engineering", slug: "web-engineering" }
  }
];

// Helper fetcher with fallback
async function fetchWithFallback<T>(endpoint: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      next: { revalidate: 60 }
    });
    if (!res.ok) return fallback;
    return await res.json();
  } catch (err) {
    return fallback;
  }
}

// Client-side API functions
export const api = {
  getCompanySettings: () => fetchWithFallback<CompanySettings>('/settings', DEFAULT_COMPANY),
  getProjects: (featuredOnly?: boolean) => fetchWithFallback<Project[]>(`/projects${featuredOnly ? '?featured_only=true' : ''}`, DEFAULT_PROJECTS),
  getProjectBySlug: async (slug: string) => {
    const projects = await api.getProjects();
    const found = projects.find(p => p.slug === slug);
    return found || DEFAULT_PROJECTS.find(p => p.slug === slug) || null;
  },
  getServices: () => fetchWithFallback<Service[]>('/services', DEFAULT_SERVICES),
  getServiceBySlug: async (slug: string) => {
    const services = await api.getServices();
    return services.find(s => s.slug === slug) || DEFAULT_SERVICES.find(s => s.slug === slug) || null;
  },
  getCourses: () => fetchWithFallback<Course[]>('/courses', DEFAULT_COURSES),
  getCourseBySlug: async (slug: string) => {
    const courses = await api.getCourses();
    return courses.find(c => c.slug === slug) || DEFAULT_COURSES.find(c => c.slug === slug) || null;
  },
  getJobs: () => fetchWithFallback<Job[]>('/careers', DEFAULT_JOBS),
  getJobBySlug: async (slug: string) => {
    const jobs = await api.getJobs();
    return jobs.find(j => j.slug === slug) || DEFAULT_JOBS.find(j => j.slug === slug) || null;
  },
  getBlogPosts: () => fetchWithFallback<BlogPost[]>('/blog', DEFAULT_BLOGS),
  getBlogPostBySlug: async (slug: string) => {
    const posts = await api.getBlogPosts();
    return posts.find(p => p.slug === slug) || DEFAULT_BLOGS.find(p => p.slug === slug) || null;
  },

  // Interactive Submissions
  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service_interest?: string;
    budget?: string;
    message: string;
  }) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to submit inquiry');
    }
    return res.json();
  },

  enrollCourse: async (data: {
    course_id: number;
    student_name: string;
    student_email: string;
    student_phone: string;
    notes?: string;
  }) => {
    const res = await fetch(`${API_BASE}/courses/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to submit enrollment');
    }
    return res.json();
  },

  applyJob: async (data: {
    job_id: number;
    name: string;
    email: string;
    phone: string;
    cover_letter?: string;
    cv_url?: string;
  }) => {
    const res = await fetch(`${API_BASE}/careers/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to submit job application');
    }
    return res.json();
  },

  sendAIChat: async (message: string, session_id?: string) => {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to connect to Jeesa AI');
    }
    return res.json() as Promise<{ answer: string; sources_used: string[]; session_id: string }>;
  }
};
