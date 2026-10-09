# Vercel Deployment Guide for JSD Group

यस प्रोजेक्टलाई **Vercel** मा deploy गर्न तलका सजिला steps हरू पालना गर्नुहोस्:

---

## १. Frontend Deployment (Project Name: `JSDGroup`)

Vercel ले Next.js लाई उत्कृष्ट तरिकाले support गर्छ।

### Dashboard बाट Deploy गर्ने तरिका (सिफारिश गरिएको):
1. **[vercel.com](https://vercel.com)** मा आफ्नो GitHub account बाट Login गर्नुहोस्।
2. **Add New... > Project** मा click गर्नुहोस्।
3. आफ्नो GitHub Repository **`RajbanshiJiban17/jsd-group-website`** छान्नुहोस्।
4. **Project Settings** मा:
   - **Project Name**: `JSDGroup`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend` (Edit मा click गरेर `frontend` folder select गर्नुहोस्)
5. **Environment Variables** थप्नुहोस्:
   - `NEXT_PUBLIC_SITE_URL`: `https://jsdgroup.vercel.app` (वा तपाईंको custom domain)
   - `NEXT_PUBLIC_API_URL`: तपाईंको backend API URL (उदा: `https://jsdgroup-api.vercel.app/api/v1` वा Backend deploy भएपछि आएको URL)
6. **Deploy** button मा click गर्नुहोस्।

---

## २. Backend Deployment (`JSDGroup-backend`)

FastAPI Backend लाई पनि Vercel मा Serverless Python Function को रूपमा deploy गर्न सकिन्छ। हामीले `backend/vercel.json` तयार पारिसकेका छौं।

### Dashboard बाट Backend Deploy गर्ने तरिका:
1. **Add New... > Project** मा जानुहोस्।
2. त्यही Repository **`RajbanshiJiban17/jsd-group-website`** import गर्नुहोस्।
3. **Project Settings**:
   - **Project Name**: `JSDGroup-backend` (वा `jsdgroup-api`)
   - **Framework Preset**: `Other`
   - **Root Directory**: `backend` (Edit गरेर `backend` छान्नुहोस्)
4. **Environment Variables** (ऐच्छिक):
   - `JWT_SECRET`: `jsd-group-production-super-secret-key-2026-secure`
   - `NEXT_PUBLIC_SITE_URL`: `https://jsdgroup.vercel.app`
5. **Deploy** मा click गर्नुहोस्।

> **नोट**: Vercel Serverless Function मा SQLite database र uploads लाई स्वतः `/tmp/` मा safe रूपमा चलाउन backend code update गरिएको छ। यदि स्थायी (persistent) database चाहिन्छ भने Vercel Postgres, Supabase, Neon वा TiDB Serverless को connection string `DATABASE_URL` मा राख्न सक्नुहुन्छ।

---

## ३. SEO Features थपिएका विवरणहरू

1. **Dynamic Sitemap (`/sitemap.xml`)**:
   - सबै मुख्य Static Pages (`/`, `/about`, `/services`, `/solutions`, `/projects`, `/courses`, `/careers`, `/blog`, `/contact`, `/privacy`, `/terms`, `/cookies`)
   - सबै Dynamic Projects (`/projects/[slug]`)
   - सबै Dynamic Courses (`/courses/[slug]`)
   - सबै Dynamic Blog Articles (`/blog/[slug]`)
   - सबै Dynamic Job Openings (`/careers/[slug]`)

2. **Robots.txt (`/robots.txt`)**:
   - Googlebot, Bingbot र सबै web crawlers लाई allow गरिएको।
   - Sensitive `/admin` र `/api` routes सुरक्षित disallow गरिएको।
   - Sitemap reference थपिएको।

3. **Page-by-Page Custom Meta & OpenGraph**:
   - प्रत्येक page को आफ्नै अद्वितीय Title, Description, र Canonical URL।
   - Dynamic pages मा `generateMetadata` द्वारा वास्तविक project/course/blog अनुसार शीर्षक र summary।
   - Social Media (Facebook, LinkedIn, Twitter/X) share गर्दा देखिने OpenGraph Cards।

4. **Schema.org Structured Data (JSON-LD)**:
   - Organization Schema
   - LocalBusiness Schema (Nepalgunj, Banke, Nepal)
   - WebSite Search Schema

5. **PWA & Search Engine Manifest (`/manifest.webmanifest`)**:
   - Mobile र browser installability का लागि पूर्ण manifest।
