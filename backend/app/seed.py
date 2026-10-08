from app.database import SessionLocal, engine, Base
from app.models.entities import (
    User, CompanySetting, Service, Project, Course, Job,
    AIKnowledge, AISetting, BlogCategory, BlogPost, SocialLink
)
from app.utils.security import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Admin User
        admin_user = db.query(User).filter(User.email == "admin@jsdgroup.com").first()
        if not admin_user:
            admin_user = User(
                email="admin@jsdgroup.com",
                hashed_password=get_password_hash("Admin@123456"),
                full_name="Jiban Chaudhary",
                role="admin",
                is_active=True
            )
            db.add(admin_user)
            print("Created default admin: admin@jsdgroup.com / Admin@123456")

        # 2. Company Settings
        company = db.query(CompanySetting).first()
        if not company:
            company = CompanySetting(
                company_name="JSD Group",
                tagline="Building Intelligent Solutions for a Digital Future.",
                description="JSD Group is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions and digital products.",
                mission="To build practical technology that creates measurable value.",
                vision="To become a trusted technology partner for businesses in Nepal and beyond.",
                values="Innovation, Quality, Transparency, Customer Success, Continuous Learning, Responsible Technology",
                founder_name="Jiban Chaudhary",
                founder_role="Founder & Technology Lead",
                founder_bio="Technology specialist and developer with in-depth focus on Python, Machine Learning, Data Analytics, FastAPI, Next.js and end-to-end intelligent systems development.",
                location="Nepalgunj-10, Adarshnagar, Banke, Nepal",
                phone="9868837762",
                email="jibanchy233@gmail.com",
                github="RajbanshiJiban17",
                linkedin="linkedin.com/in/jiban-chaudhary-732698384",
                personal_website="JibanChaudhary1.com.np"
            )
            db.add(company)

        # 3. Social Links
        if db.query(SocialLink).count() == 0:
            socials = [
                SocialLink(platform="GitHub", url="https://github.com/RajbanshiJiban17", is_active=True),
                SocialLink(platform="LinkedIn", url="https://linkedin.com/in/jiban-chaudhary-732698384", is_active=True),
                SocialLink(platform="Website", url="https://JibanChaudhary1.com.np", is_active=True),
                SocialLink(platform="Facebook", url="https://facebook.com/jsdgroup", is_active=True),
            ]
            db.add_all(socials)

        # 4. Services
        if db.query(Service).count() == 0:
            services_data = [
                {
                    "title": "AI Solutions",
                    "slug": "ai-solutions",
                    "icon": "Brain",
                    "short_description": "Custom artificial intelligence systems, computer vision, and NLP designed for high-impact business applications.",
                    "full_description": "We architect and deploy cutting-edge artificial intelligence systems specifically tailored to solve business bottlenecks. From natural language processing to visual inspection systems, we bring production-grade AI into active business workflows.",
                    "benefits": "Automate complex decision processes, uncover predictive patterns, and lower human operating overhead.",
                    "technologies": "Python, PyTorch, TensorFlow, Hugging Face, OpenCV, FastAPI",
                    "use_cases": "Automated document intelligence, customer sentiment analysis, smart recommendation engines.",
                    "order": 1
                },
                {
                    "title": "AI Automation",
                    "slug": "ai-automation",
                    "icon": "Bot",
                    "short_description": "End-to-end intelligent workflow automation integrating AI models with existing enterprise software.",
                    "full_description": "Eliminate repetitive manual tasks by linking intelligent LLM workflows, automated data extractors, and transactional systems. We automate lead routing, document processing, and customer ticket handling.",
                    "benefits": "10x speed in data turnaround, human error reduction, 24/7 autonomous operations.",
                    "technologies": "LangChain, LlamaIndex, Python, Webhooks, FastAPI, Celery",
                    "use_cases": "Automated invoice parsing, support inquiry routing, automated report generation.",
                    "order": 2
                },
                {
                    "title": "Data Analysis",
                    "slug": "data-analysis",
                    "icon": "BarChart3",
                    "short_description": "Transforming unstructured business metrics into clear visual dashboards, KPI monitors, and actionable insights.",
                    "full_description": "Data without interpretation is useless. We build robust ETL pipelines, metric dashboards, and KPI tracking systems that empower executives to make evidence-based decisions.",
                    "benefits": "Real-time visibility into profit margins, inventory movement, and customer retention metrics.",
                    "technologies": "Pandas, NumPy, SQL, PowerBI, Metabase, Plotly, DuckDB",
                    "use_cases": "Retail transaction analytics, revenue forecasting, inventory turnover optimization.",
                    "order": 3
                },
                {
                    "title": "Machine Learning",
                    "slug": "machine-learning",
                    "icon": "Cpu",
                    "short_description": "Predictive modeling, classification, regression, and clustering algorithms trained on real business data.",
                    "full_description": "Deploy machine learning models that predict customer churn, estimate credit risks, forecast demand, and classify transactions with statistical rigor.",
                    "benefits": "Anticipate customer departures before they happen, optimize resource scheduling.",
                    "technologies": "Scikit-Learn, XGBoost, LightGBM, Pandas, MLflow",
                    "use_cases": "Customer churn prediction, predictive maintenance, dynamic pricing.",
                    "order": 4
                },
                {
                    "title": "Web Development",
                    "slug": "web-development",
                    "icon": "Globe",
                    "short_description": "High-performance web applications built with Next.js, TypeScript, Tailwind CSS, and scalable REST/GraphQL APIs.",
                    "full_description": "We engineer ultra-fast, search engine-optimized web applications and corporate portals with sleek modern design, dark/light modes, and interactive 3D visualizations.",
                    "benefits": "Sub-second load times, flawless mobile responsiveness, highest Lighthouse SEO performance.",
                    "technologies": "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
                    "use_cases": "Corporate brand portals, SaaS user interfaces, customer self-service dashboards.",
                    "order": 5
                },
                {
                    "title": "Software Development",
                    "slug": "software-development",
                    "icon": "Code2",
                    "short_description": "Enterprise software engineering, custom CRM/ERP backends, and microservices built for scalability.",
                    "full_description": "Robust backend systems engineered using Python, FastAPI, and relational databases. We build clean, modular, and maintainable software architectures ready for cloud scaling.",
                    "benefits": "Secure role-based access, automated tests, clean REST APIs, high concurrency handling.",
                    "technologies": "Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, Docker",
                    "use_cases": "Custom ERP systems, billing software, inventory control software.",
                    "order": 6
                },
                {
                    "title": "App Development",
                    "slug": "app-development",
                    "icon": "Smartphone",
                    "short_description": "Cross-platform mobile applications for iOS and Android delivering smooth native performance.",
                    "full_description": "Modern mobile solutions that empower field agents, delivery drivers, and retail clients with offline capabilities, push notifications, and biometric logins.",
                    "benefits": "Single codebase for iOS and Android, instant cloud synchronization.",
                    "technologies": "React Native, Flutter, REST APIs, SQLite",
                    "use_cases": "E-commerce apps, field data collection, client portal apps.",
                    "order": 7
                },
                {
                    "title": "Business Automation",
                    "slug": "business-automation",
                    "icon": "Zap",
                    "short_description": "Digital transformation workflows integrating databases, SMS gateways, payment systems, and internal tools.",
                    "full_description": "Connect disparate software silos into unified automated operations. From automated payment verification to SMS notification dispatching.",
                    "benefits": "Reduced operational delay, enhanced accountability, automated audit trails.",
                    "technologies": "Python, RabbitMQ, Webhooks, REST Integrations",
                    "use_cases": "Automated order fulfillment, accounting sync, customer onboarding.",
                    "order": 8
                },
                {
                    "title": "Digital Marketing",
                    "slug": "digital-marketing",
                    "icon": "TrendingUp",
                    "short_description": "Data-driven SEO, conversion rate optimization, content marketing, and targeted digital acquisition campaigns.",
                    "full_description": "Combine technical SEO with analytical performance marketing to generate genuine business leads and brand authority across Nepal and international markets.",
                    "benefits": "Organic search ranking dominance, measurable return on marketing spend.",
                    "technologies": "Google Analytics 4, Search Console, Technical SEO, Schema Markup",
                    "use_cases": "Local SEO ranking for Nepalgunj businesses, B2B lead generation funnels.",
                    "order": 9
                },
                {
                    "title": "IT Consulting",
                    "slug": "it-consulting",
                    "icon": "Compass",
                    "short_description": "Strategic technology roadmaps, cloud architecture evaluation, and technology stack selection for growing companies.",
                    "full_description": "We advise enterprise leadership on software modernization, security compliance, cloud cost optimization, and practical digital roadmap implementation.",
                    "benefits": "Avoid expensive software procurement traps, establish scalable technical foundations.",
                    "technologies": "Cloud Architecture, System Design, Security Audits",
                    "use_cases": "Legacy system migration, enterprise technology audits.",
                    "order": 10
                },
                {
                    "title": "Hardware & IT Services",
                    "slug": "hardware-it-services",
                    "icon": "Server",
                    "short_description": "Local networking infrastructure, server administration, secure backups, and workplace IT support in Banke.",
                    "full_description": "Dedicated on-premises and hybrid IT infrastructure management for businesses located in Nepalgunj and western Nepal.",
                    "benefits": "Minimal system downtime, secure localized backups, rapid hardware troubleshooting.",
                    "technologies": "Linux Administration, Networking, Firewall, Data Backup Solutions",
                    "use_cases": "Office network deployment, server maintenance, endpoint security.",
                    "order": 11
                },
                {
                    "title": "IT Training",
                    "slug": "it-training",
                    "icon": "GraduationCap",
                    "short_description": "Rigorous practical training programs in Python, Data Science, Machine Learning, and Web Engineering.",
                    "full_description": "Industry-grade curriculum delivered by lead engineers focusing on real project development, git workflows, and portfolio readiness.",
                    "benefits": "Hands-on project experience, mentorship from active technology practitioners.",
                    "technologies": "Python, SQL, Next.js, Scikit-Learn, FastAPI",
                    "use_cases": "Skill upgrading for students, corporate workforce digital upskilling.",
                    "order": 12
                }
            ]
            for s in services_data:
                db.add(Service(**s))

        # 5. Genuine Projects
        if db.query(Project).count() == 0:
            projects_data = [
                {
                    "title": "RetailIQ Nepal",
                    "slug": "retailiq-nepal",
                    "summary": "Business analytics and inventory intelligence platform tailored for small and medium enterprises (SMEs) in Nepal.",
                    "problem": "Traditional SMEs in Nepal struggle with inventory tracking, unpredictability in stock depletion, and fragmented sales records stored in manual notebooks or disjointed spreadsheets.",
                    "solution": "A centralized analytics dashboard offering real-time sales reporting, dead-stock detection, predictive reorder points, and automated cashflow summaries.",
                    "features": "Sales Analytics\nProduct Performance Matrix\nInventory Insights\nLow Stock Detection & Alerts\nBusiness Dashboard\nAI-assisted Business Insights",
                    "architecture": "Client: Next.js + Tailwind CSS\nAPI Layer: FastAPI (Python) asynchronous microservices\nDatabase: SQLite / PostgreSQL with SQLAlchemy ORM\nCaching: In-memory analytical cache",
                    "technologies": "Python, FastAPI, SQLAlchemy, Next.js, TypeScript, Chart.js",
                    "results": "Empowers SME managers to analyze top-selling inventory within seconds and reduces stockout occurrences by up to 35% through automated alerts.",
                    "github_url": "https://github.com/RajbanshiJiban17",
                    "live_demo_url": "https://retailiq.jsdgroup.com",
                    "is_featured": True,
                    "order": 1
                },
                {
                    "title": "Smart Agriculture Advisor",
                    "slug": "smart-agriculture-advisor",
                    "summary": "AI-assisted crop recommendation and disease detection system designed for regional farmers and agrarian cooperatives.",
                    "problem": "Farmers often suffer heavy crop yield losses due to untimely disease diagnosis and suboptimal fertilizer application unsuitable for local soil parameters.",
                    "solution": "An intelligent web application where farmers input soil attributes (N, P, K, pH, rainfall) to receive optimal crop selections, along with an image classification pipeline for visual leaf disease detection.",
                    "features": "Soil-based Crop Recommendation\nPlant Leaf Disease Classifier\nWeather & Seasonal Guidelines\nBilingual Interface (Nepali & English)\nActionable treatment recommendations",
                    "architecture": "ML Models: Random Forest Crop Predictor & CNN ResNet for disease identification\nBackend: FastAPI REST API service\nFrontend: Responsive Next.js web application",
                    "technologies": "Python, Scikit-Learn, PyTorch, FastAPI, OpenCV, Next.js",
                    "results": "Delivered over 94% accuracy in laboratory crop recommendation benchmarks against regional agricultural dataset controls.",
                    "github_url": "https://github.com/RajbanshiJiban17",
                    "live_demo_url": "https://smartagri.jsdgroup.com",
                    "is_featured": True,
                    "order": 2
                },
                {
                    "title": "Employee Churn Prediction",
                    "slug": "employee-churn-prediction",
                    "summary": "Machine learning system analyzing organizational HR metrics to forecast employee turnover and identify retention factors.",
                    "problem": "Unplanned corporate attrition creates severe recruiting expenses and project delivery delays that could be avoided if early warning indicators were spotted.",
                    "solution": "An end-to-end predictive modeling application that correlates workload metrics, satisfaction indices, evaluation ratings, and tenure to score turnover likelihood.",
                    "features": "Attrition Probability Scoring\nKey Driver Analysis with SHAP values\nInteractive HR Risk Matrix\nDepartmental Attrition Heatmap\nExportable Risk Assessment Reports",
                    "architecture": "Data Pipeline: Scikit-Learn and Pandas feature transformation\nPredictive Model: XGBoost & Logistic Regression ensemble\nAPI: FastAPI endpoints serving predictions in sub-100ms",
                    "technologies": "Python, Scikit-Learn, XGBoost, Pandas, FastAPI, React",
                    "results": "Achieved 89% ROC-AUC score on employee historical datasets, spotlighting overwork and lack of promotion velocity as primary turnover triggers.",
                    "github_url": "https://github.com/RajbanshiJiban17",
                    "live_demo_url": "https://churn.jsdgroup.com",
                    "is_featured": True,
                    "order": 3
                },
                {
                    "title": "RAG / AI Knowledge System",
                    "slug": "rag-ai-knowledge-system",
                    "summary": "Retrieval-Augmented Generation platform that indexes corporate documents and policies to provide hallucination-free answers.",
                    "problem": "Traditional LLMs make unsupported claims and lack visibility into private enterprise documents, while manual search across PDF files wastes hundreds of employee hours.",
                    "solution": "A robust RAG engine that parses organizational documentation, generates semantic embeddings, and injects exact cited context into generated answers.",
                    "features": "Automated Document Chunking & Embedding\nHybrid Vector & Keyword Search\nExact Citation Reference\nHallucination Detection Guardrails\nRole-based Document Security",
                    "architecture": "Vector Store: SQLite vector / FAISS index\nBackend: FastAPI with LangChain / custom retrieval pipelines\nFrontend: Sleek conversational UI with citation inspector",
                    "technologies": "Python, FastAPI, LangChain, SQLite, Sentence-Transformers, Next.js",
                    "results": "Reduces document query lookup time from minutes to under 2 seconds with zero fabrication of unindexed facts.",
                    "github_url": "https://github.com/RajbanshiJiban17",
                    "live_demo_url": "https://rag.jsdgroup.com",
                    "is_featured": True,
                    "order": 4
                },
                {
                    "title": "Jeevan-Sangini AI",
                    "slug": "jeevan-sangini-ai",
                    "summary": "An intelligent conversational assistant engineered to provide empathetic, contextual maternal and wellness guidance in regional languages.",
                    "problem": "Maternal health literacy in underserved regions suffers from lack of immediate, stigma-free access to medically verified maternal healthcare guidance.",
                    "solution": "A bilingual conversational AI assistant engineered with vetted healthcare information, emergency contact routing, and prenatal milestone tracking.",
                    "features": "Nepali & English Conversational Support\nTrimester-specific Dietary Guidelines\nVaccination Milestone Scheduler\nEmergency Hospital Directory\nPrivacy-first Architecture",
                    "architecture": "NLP Pipeline: Custom conversational intents & verified medical knowledge retriever\nBackend: FastAPI asynchronous event loop\nClient: Lightweight PWA optimized for low-bandwidth mobile connections",
                    "technologies": "Python, FastAPI, SQLite, PWA, Tailwind CSS",
                    "results": "Provides clear, grounded answers to hundreds of common prenatal health queries with verified clinical safety guardrails.",
                    "github_url": "https://github.com/RajbanshiJiban17",
                    "live_demo_url": "https://sangini.jsdgroup.com",
                    "is_featured": True,
                    "order": 5
                }
            ]
            for p in projects_data:
                db.add(Project(**p))

        # 6. Courses
        if db.query(Course).count() == 0:
            courses_data = [
                {
                    "title": "Data Science with Python",
                    "slug": "data-science-with-python",
                    "summary": "Master data analysis, exploratory data visualization, statistical testing, and practical predictive modeling using Python.",
                    "duration": "10 Weeks (60 Hours)",
                    "level": "Beginner to Intermediate",
                    "curriculum": "Module 1: Python Core & Functional Foundations\nModule 2: Data Manipulation with NumPy & Pandas\nModule 3: Exploratory Data Analysis & Seaborn Visualizations\nModule 4: Applied Statistics & Probability for Data Science\nModule 5: Scikit-Learn Predictive Modeling\nModule 6: Capstone Real-world Project & Deployment",
                    "instructor": "Jiban Chaudhary",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 1
                },
                {
                    "title": "AI/ML with Python",
                    "slug": "ai-ml-with-python",
                    "summary": "Deep dive into machine learning algorithms, neural network foundations, deep learning, and building production AI pipelines.",
                    "duration": "12 Weeks (72 Hours)",
                    "level": "Intermediate to Advanced",
                    "curriculum": "Module 1: Mathematical Foundations of Machine Learning\nModule 2: Regression, Classification & Clustering Algorithms\nModule 3: Ensemble Techniques: Random Forests & XGBoost\nModule 4: Neural Networks & PyTorch Fundamentals\nModule 5: Natural Language Processing & Transformer Basics\nModule 6: Deploying ML Models with FastAPI & Docker",
                    "instructor": "Jiban Chaudhary",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 2
                },
                {
                    "title": "Data Analytics",
                    "slug": "data-analytics",
                    "summary": "Learn business metrics analysis, advanced SQL, data cleaning, dashboard creation, and KPI reporting for real businesses.",
                    "duration": "8 Weeks (48 Hours)",
                    "level": "Beginner Friendly",
                    "curriculum": "Module 1: Business Intelligence & KPI Principles\nModule 2: Relational Databases & Advanced SQL Queries\nModule 3: Data Cleaning with Python & Pandas\nModule 4: Building Interactive Dashboards in Metabase & PowerBI\nModule 5: Storytelling with Business Data & Executive Reports\nModule 6: Capstone SME Case Study Analysis",
                    "instructor": "Jiban Chaudhary",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 3
                },
                {
                    "title": "Web Development",
                    "slug": "web-development",
                    "summary": "Modern full-stack web engineering using Next.js, React, TypeScript, Tailwind CSS, and Python FastAPI backend APIs.",
                    "duration": "10 Weeks (60 Hours)",
                    "level": "All Levels",
                    "curriculum": "Module 1: Modern HTML5, Responsive CSS & Tailwind CSS\nModule 2: Modern JavaScript (ES6+) & TypeScript Foundations\nModule 3: React 19 & Next.js App Router Architecture\nModule 4: FastAPI REST Backend Engineering & SQLite/PostgreSQL\nModule 5: JWT Authentication, State Management & Security\nModule 6: Production Deployment & Continuous Integration",
                    "instructor": "Jiban Chaudhary",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 4
                },
                {
                    "title": "Python Programming",
                    "slug": "python-programming",
                    "summary": "A comprehensive foundation in Python covering object-oriented programming, file systems, APIs, and algorithmic problem solving.",
                    "duration": "6 Weeks (36 Hours)",
                    "level": "Absolute Beginner",
                    "curriculum": "Module 1: Syntax, Variables, Data Types & Control Flow\nModule 2: Functions, Scopes & Modular Programming\nModule 3: Object-Oriented Programming (Classes & Inheritance)\nModule 4: File I/O, Exception Handling & JSON Processing\nModule 5: Working with External REST APIs using Requests/HTTPX\nModule 6: Final Automation Project",
                    "instructor": "Jiban Chaudhary",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 5
                },
                {
                    "title": "Digital Marketing",
                    "slug": "digital-marketing",
                    "summary": "Technical SEO, content marketing, performance acquisition, and digital strategy for modern companies and local brands.",
                    "duration": "6 Weeks (36 Hours)",
                    "level": "Beginner Friendly",
                    "curriculum": "Module 1: Principles of Modern Digital Marketing\nModule 2: Technical SEO, Keyword Research & On-page Optimization\nModule 3: Google Search Console & GA4 Performance Tracking\nModule 4: Social Media Content Funnels & Paid Ad Strategies\nModule 5: Conversion Rate Optimization & Landing Page Design\nModule 6: Digital Growth Strategy Pitch",
                    "instructor": "JSD Digital Team",
                    "price": "Inquire for batch scholarship & fee",
                    "batch": "Upcoming Cohort - Admissions Open",
                    "is_enrolling": True,
                    "is_active": True,
                    "order": 6
                }
            ]
            for c in courses_data:
                db.add(Course(**c))

        # 7. Careers
        if db.query(Job).count() == 0:
            jobs_data = [
                {
                    "title": "Junior Python Developer",
                    "slug": "junior-python-developer",
                    "department": "Engineering",
                    "location": "Nepalgunj, Banke / Hybrid",
                    "type": "Full-Time",
                    "experience_level": "0 - 1 Year",
                    "description": "Join our engineering team to build scalable REST APIs, automated data pipelines, and backend services using Python and FastAPI.",
                    "requirements": "Solid grasp of Python 3.10+, basic understanding of relational databases (SQL), familiarity with git version control, and enthusiasm for clean code.",
                    "responsibilities": "Develop backend endpoints, write unit tests, integrate with frontend applications, and maintain database models.",
                    "is_active": True
                },
                {
                    "title": "Data Analyst Intern",
                    "slug": "data-analyst-intern",
                    "department": "Data Science",
                    "location": "Nepalgunj, Banke / Hybrid",
                    "type": "Internship (3 Months)",
                    "experience_level": "Entry Level",
                    "description": "Work directly with client datasets to clean, analyze, visualize, and generate actionable business intelligence dashboards.",
                    "requirements": "Familiarity with SQL, Python (Pandas/Matplotlib), and spreadsheet modeling. Strong analytical intuition and communication skills.",
                    "responsibilities": "Assist senior analysts in ETL processes, compile weekly KPI charts, and build automated reporting templates.",
                    "is_active": True
                },
                {
                    "title": "AI/ML Intern",
                    "slug": "ai-ml-intern",
                    "department": "AI Research",
                    "location": "Nepalgunj, Banke / Hybrid",
                    "type": "Internship (3 Months)",
                    "experience_level": "Entry Level",
                    "description": "Assist in researching, training, and benchmarking machine learning and computer vision models for regional client solutions.",
                    "requirements": "Understanding of basic ML algorithms (Regression, Random Forests), hands-on Python experience, and theoretical curiosity.",
                    "responsibilities": "Prepare dataset annotations, evaluate benchmark models, write experimental logs, and integrate APIs.",
                    "is_active": True
                },
                {
                    "title": "Backend Developer",
                    "slug": "backend-developer",
                    "department": "Engineering",
                    "location": "Nepalgunj, Banke / Hybrid",
                    "type": "Full-Time",
                    "experience_level": "1 - 3 Years",
                    "description": "Architect high-performance APIs, database schemas, authentication systems, and cloud background workers.",
                    "requirements": "Proficiency in FastAPI/Django/Flask, SQLAlchemy, PostgreSQL, Docker, and Redis caching.",
                    "responsibilities": "Lead API design, implement robust security protocols, optimize query performance, and ensure 99.9% uptime.",
                    "is_active": True
                },
                {
                    "title": "Frontend Developer",
                    "slug": "frontend-developer",
                    "department": "Product",
                    "location": "Nepalgunj, Banke / Hybrid",
                    "type": "Full-Time",
                    "experience_level": "1 - 2 Years",
                    "description": "Create responsive, accessible, and visually stunning web interfaces using Next.js, React, TypeScript, and modern CSS.",
                    "requirements": "Strong experience with Next.js App Router, Tailwind CSS, state management, and modern component design patterns.",
                    "responsibilities": "Translate design prototypes into responsive code, integrate REST APIs, and optimize Core Web Vitals.",
                    "is_active": True
                },
                {
                    "title": "Digital Marketing Intern",
                    "slug": "digital-marketing-intern",
                    "department": "Growth",
                    "location": "Nepalgunj, Banke / Remote",
                    "type": "Internship (3 Months)",
                    "experience_level": "Entry Level",
                    "description": "Help expand JSD Group's digital presence through technical blog writing, SEO optimization, and social media storytelling.",
                    "requirements": "Strong written communication in English and Nepali, understanding of basic SEO, and creative flair.",
                    "responsibilities": "Draft tech tutorials, optimize metadata, analyze social engagement metrics, and coordinate marketing materials.",
                    "is_active": True
                }
            ]
            for j in jobs_data:
                db.add(Job(**j))

        # 8. AI Settings & Knowledge Base
        ai_setting = db.query(AISetting).first()
        if not ai_setting:
            ai_setting = AISetting(
                welcome_message="नमस्ते! म Jeesa AI, JSD Group को AI Assistant हुँ। तपाईंलाई के help चाहिएको छ?",
                thank_you_message="Welcome! 😊 अरू कुनै जानकारी चाहिएको भए भन्नुहोस्, म सहयोग गर्छु।",
                unverified_fallback="मसँग यसबारे verified जानकारी छैन। तपाईं चाहनुहुन्छ भने JSD Group को team सँग directly contact गर्न सक्नुहुन्छ।",
                verified_only_mode=True,
                allow_general_tech_answers=True,
                personality_prompt=(
                    "You are Jeesa AI, the official AI assistant of JSD Group. "
                    "Communicate primarily in polite, professional, concise Nepali, with technical terms in natural English. "
                    "Never invent or hallucinate information about clients, revenue, branches, awards, or partners. "
                    "If information is missing in verified company records, state politely that you do not have verified data and suggest contacting the JSD Group team directly."
                )
            )
            db.add(ai_setting)

        if db.query(AIKnowledge).count() == 0:
            knowledge_items = [
                {
                    "category": "Company",
                    "title": "JSD Group Overview",
                    "content": "JSD Group is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions, and digital products. Tagline: 'Building Intelligent Solutions for a Digital Future.'",
                    "keywords": "jsd group, overview, company, what is, background, tagline"
                },
                {
                    "category": "Founder",
                    "title": "Jiban Chaudhary Profile",
                    "content": "Jiban Chaudhary is the Founder & Technology Lead of JSD Group. He specializes in Python, Data Science, Machine Learning, FastAPI, Web Development, and software engineering. Location: Nepalgunj, Banke. GitHub: RajbanshiJiban17, LinkedIn: linkedin.com/in/jiban-chaudhary-732698384, Personal Website: JibanChaudhary1.com.np.",
                    "keywords": "jiban chaudhary, founder, ceo, technology lead, who is jiban, credentials"
                },
                {
                    "category": "Contact",
                    "title": "Official Contact Details",
                    "content": "Office Location: Nepalgunj-10, Adarshnagar, Banke, Nepal. Phone: 9868837762. Email: jibanchy233@gmail.com. Online inquiries can be submitted via the contact form on our website.",
                    "keywords": "contact, phone, email, location, address, nepalgunj, phone number"
                },
                {
                    "category": "FAQ",
                    "title": "How to Start a Project with JSD Group",
                    "content": "To start a project, visitors can click the 'Let's Talk' button, navigate to the Contact page, fill out their project requirements, service needed, and estimated budget, or email jibanchy233@gmail.com directly.",
                    "keywords": "hire, start project, work together, contact team, proposal"
                },
                {
                    "category": "Solutions",
                    "title": "RetailIQ Nepal Platform",
                    "content": "RetailIQ Nepal is a business analytics and inventory intelligence platform developed by JSD Group for small and medium enterprises (SMEs) in Nepal. It features sales analytics, product performance matrix, inventory insights, and low-stock detection.",
                    "keywords": "retailiq, retailiq nepal, sme, inventory, sales analytics, product"
                }
            ]
            for ki in knowledge_items:
                db.add(AIKnowledge(**ki))

        # 9. Blog Categories & Posts
        if db.query(BlogCategory).count() == 0:
            cat_ai = BlogCategory(name="AI & Machine Learning", slug="ai-machine-learning")
            cat_data = BlogCategory(name="Data Science", slug="data-science")
            cat_web = BlogCategory(name="Web Engineering", slug="web-engineering")
            cat_tech = BlogCategory(name="Business Technology", slug="business-technology")
            db.add_all([cat_ai, cat_data, cat_web, cat_tech])
            db.commit()

            posts_data = [
                {
                    "title": "Practical Machine Learning for Businesses in Nepal: Moving Beyond the Hype",
                    "slug": "practical-machine-learning-nepal",
                    "summary": "How Nepali enterprises and SMEs can leverage practical predictive models to reduce inventory losses and retain valuable customers.",
                    "content": """Artificial Intelligence and Machine Learning often sound like abstract buzzwords, but in real enterprise settings, their value is concrete and measurable.

### The Real Business Bottlenecks
Most growing businesses in Nepal face two constant friction points:
1. **Unpredictable Inventory Depletion**: Capital tied up in stagnant stock while high-demand items run dry.
2. **Customer Churn**: Losing valuable recurring clients without understanding the early warning signs.

### Practical Predictive Systems
By training algorithms on historical sales transactions and customer interaction logs, organizations can forecast demand curves weeks in advance. Rather than waiting for monthly manual reviews, predictive intelligence flags items approaching threshold depletion automatically.

At JSD Group, our core philosophy is **practical technology that creates measurable value**. We build targeted, production-ready AI solutions that integrate seamlessly with your day-to-day workflow.""",
                    "category_id": cat_ai.id,
                    "seo_title": "Practical Machine Learning for Businesses in Nepal | JSD Group",
                    "seo_description": "Discover how businesses in Nepal can utilize machine learning and predictive analytics to optimize operations.",
                    "is_published": True
                },
                {
                    "title": "Why Modern Full-Stack Architecture Matters: Next.js + FastAPI",
                    "slug": "nextjs-fastapi-fullstack-architecture",
                    "summary": "An engineering deep-dive into why combining Next.js with Python FastAPI yields the ideal balance of frontend speed and backend analytical power.",
                    "content": """When designing serious enterprise digital products, technology stack selection dictates both development velocity and long-term maintainability.

### The Power of Next.js on the Frontend
Next.js provides server-side rendering, sub-second route transitions, and premier Core Web Vitals performance out of the box. For business websites, search engine discoverability (SEO) and instant loading on mobile devices directly influence conversion rates.

### Why FastAPI is the Premier Backend for AI & Data
Python is the undisputed leader in data science and artificial intelligence. By pairing FastAPI with SQLAlchemy:
- **Asynchronous Throughput**: High concurrency handling powered by Starlette and AnyIO.
- **Strict Data Validation**: Pydantic models eliminate data mutation bugs before they hit the database.
- **Native AI Pipeline Integration**: Python models run in the same native environment without heavy inter-process IPC overhead.

This decoupled architecture allows the user interface to evolve rapidly while backend data pipelines remain rock-solid and secure.""",
                    "category_id": cat_web.id,
                    "seo_title": "Next.js + FastAPI Full-Stack Architecture | JSD Group Engineering",
                    "seo_description": "Explore the architectural advantages of pairing Next.js with Python FastAPI for high-performance enterprise systems.",
                    "is_published": True
                }
            ]
            for p in posts_data:
                db.add(BlogPost(**p))

        db.commit()
        print("Database seeded successfully with verified JSD Group data.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
