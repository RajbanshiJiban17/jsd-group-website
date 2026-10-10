https://jsdgroup.vercel.app/


# JSD GROUP — CORPORATE PLATFORM & JEESA AI ASSISTANT

> **Tagline**: Building Intelligent Solutions for a Digital Future.  
> **Official Corporate Website & AI Service Platform for JSD Group**

---

## 1. Executive Summary

**JSD Group** is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions, and digital products.

This repository contains the complete, production-ready corporate application:
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, and Lucide React.
- **Backend**: Python 3.12+, FastAPI asynchronous microservices, Pydantic v2, SQLAlchemy ORM, and JWT authentication.
- **Database**: SQLite (`jsd_group.db`) with relational integrity and seamless PostgreSQL migration readiness.
- **AI Service**: **Jeesa AI Assistant** with verified retrieval-augmented grounding (RAG), strict anti-hallucination guardrails, and bilingual (Nepali + English) natural interaction.
- **Administration**: Comprehensive 12-module Admin Command Center.

---

## 2. Verified Corporate Information

- **Company Name**: JSD Group
- **Founder & Technology Lead**: Jiban Chaudhary
- **Headquarters**: Nepalgunj-10, Adarshnagar, Banke, Nepal
- **Phone**: 9868837762
- **Email**: [jibanchy233@gmail.com](mailto:jibanchy233@gmail.com)
- **GitHub**: [RajbanshiJiban17](https://github.com/RajbanshiJiban17)
- **LinkedIn**: [linkedin.com/in/jiban-chaudhary-732698384](https://linkedin.com/in/jiban-chaudhary-732698384)
- **Personal Website**: [JibanChaudhary1.com.np](https://JibanChaudhary1.com.np)

*Zero Hallucination Guarantee: No artificial clients, fabricated awards, or speculative revenue numbers are generated. All information is strictly verified.*

---

## 3. Technology Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 16+ (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Glassmorphism tokens
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS keyframe transforms
- **Theming**: Dark mode default with light mode toggle

### Backend (`/backend`)
- **Runtime**: Python 3.12+
- **API Framework**: FastAPI with Starlette and AnyIO
- **Validation**: Pydantic v2
- **ORM & Data Layer**: SQLAlchemy 2.0
- **Security**: JWT tokens (`python-jose`) and `bcrypt` password hashing
- **Abuse Prevention**: In-memory IP/session rate limiter

### Database
- **Engine**: SQLite (`jsd_group.db`) with foreign key constraints, cascade deletes, and indexing.
- **Migration Path**: SQLAlchemy architecture allows instant migration to PostgreSQL or MySQL simply by updating `DATABASE_URL` in `.env`.

---

## 4. Jeesa AI Assistant

**Jeesa AI** is the official AI assistant of JSD Group:
1. **Primary Language**: Polite and professional Nepali, retaining technical terminology in English (e.g., *Machine Learning*, *API*, *FastAPI*, *Next.js*).
2. **First Greeting**:
   > *"नमस्ते! म Jeesa AI, JSD Group को AI Assistant हुँ। तपाईंलाई के help चाहिएको छ?"*
3. **Gratitude Response**:
   > *"Welcome! 😊 अरू कुनै जानकारी चाहिएको भए भन्नुहोस्, म सहयोग गर्छु।"*
4. **Hallucination Control**: If information is not in the verified database, it responds:
   > *"मसँग यसबारे verified जानकारी छैन। तपाईं चाहनुहुन्छ भने JSD Group को team सँग directly contact गर्न सक्नुहुन्छ।"*
5. **Allowed Technology Scope**: Concisely answers questions on Python, SQL, Machine Learning, and Web Engineering while distinguishing general technical knowledge from official JSD Group claims.
6. **Modular LLM Support**: Supports Google Gemini API (`gemini-1.5-flash`), OpenAI API, or the built-in deterministic local retrieval engine (100% autonomous with zero external dependencies).

---

## 5. Quick Start (Local Development)

### Prerequisites
- Node.js 18+ & npm
- Python 3.10+

### Step 1: Start Backend (FastAPI)
```powershell
cd c:\companywebiste\backend

# Create virtual environment
python -m venv venv

# Activate on Windows
.\venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run database seeder (initializes tables and verified records)
python -m app.seed

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
- API Documentation (Swagger): `http://127.0.0.1:8000/api/v1/docs`
- Interactive ReDoc: `http://127.0.0.1:8000/api/v1/redoc`

### Step 2: Start Frontend (Next.js)
```powershell
cd c:\companywebiste\frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
- Access application: `http://localhost:3000`

---

## 6. Admin Credentials

- **Portal URL**: `http://localhost:3000/admin/login`
- **Default Email**: `admin@jsdgroup.com`
- **Default Password**: `Admin@123456`

The Admin Dashboard provides full CRUD management for:
- Client Inquiries & Contact Messages
- Student Course Enrollments
- Candidate Job Applications
- Genuine Projects Portfolio
- Services Catalog
- Course Cohorts & Curricula
- Engineering Blog Articles
- Career Openings
- Jeesa AI Personality & Hallucination Settings
- Jeesa AI Verified Knowledge Base Entries
- Company Contact & Founder Profile

---

## 7. Production Deployment Guide

### Frontend Deployment (Vercel)
1. Push project to GitHub.
2. Link repository to [Vercel](https://vercel.com).
3. Set root directory to `frontend`.
4. Configure environment variable:
   - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

### Backend Deployment (Render / Railway / VPS)
1. Deploy `backend` directory.
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. For persistent storage on cloud platforms without persistent disks, configure a managed PostgreSQL instance and set:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/jsd_group
   ```

---

## 8. License & Copyright

© 2026 JSD Group. All rights reserved.  
Headquartered in Nepalgunj-10, Adarshnagar, Banke, Nepal.
