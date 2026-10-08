import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Brain, Cpu, Database, CheckCircle2,
  Code2, ExternalLink, BookOpen, Users, Compass, ChevronRight
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import Hero3D from '@/components/Hero3D';
import RetailIQShowcase from '@/components/RetailIQShowcase';
import ContactForm from '@/components/ContactForm';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [company, projects, services, courses, blogs] = await Promise.all([
    api.getCompanySettings(),
    api.getProjects(true),
    api.getServices(),
    api.getCourses(),
    api.getBlogPosts()
  ]);

  return (
    <div className="relative overflow-hidden">
      {/* Radiant ambient glow */}
      <div className="tech-glow top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Generation AI & Enterprise Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Building Intelligent Solutions for a{' '}
                <span className="gradient-text">Digital Future.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                JSD Group builds practical AI, data, software, automation and digital solutions that help businesses turn ideas into measurable digital products.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/projects"
                  className="px-7 py-4 rounded-xl font-bold text-sm text-white border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 transition-all flex items-center gap-2"
                >
                  <span>Explore Our Work</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

              {/* Jeesa AI Prompt Card near hero */}
              <div className="pt-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-3.5 rounded-2xl glass-card border border-cyan-500/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-slate-200">
                      Have questions about JSD Group or our courses?
                    </p>
                    <p className="text-slate-400">
                      Ask <span className="text-cyan-400 font-medium">Jeesa AI Assistant</span> on the bottom right in Nepali or English.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 3D Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & CORE STACK HIGHLIGHTS --- */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">
            Engineered with Modern Industry Standards
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 text-sm font-medium">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Python 3.12+
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> FastAPI REST
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-indigo-400" /> Next.js 15+
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> PyTorch / Scikit-Learn
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> PostgreSQL / SQLite
            </span>
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCT SPOTLIGHT (RetailIQ Nepal) --- */}
      <RetailIQShowcase />

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Brain className="w-3.5 h-3.5" />
                <span>What We Deliver</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Specialized Services
              </h2>
              <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
                From machine learning pipelines to enterprise web platforms, we provide complete technical lifecycle execution.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>View all 12 services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="p-7 rounded-2xl glass-card flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.short_description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono text-cyan-400/80 truncate">
                    {service.technologies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REAL PROJECTS PORTFOLIO --- */}
      <section className="py-24 bg-slate-950/60 border-t border-slate-800/80 relative">
        <div className="tech-glow bottom-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Code2 className="w-3.5 h-3.5" />
                <span>Verified Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Authentic Projects
              </h2>
              <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
                Real software solutions, machine learning models, and analytics platforms engineered by JSD Group.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>Browse full project catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-7 rounded-2xl glass-card border border-slate-800/80 flex flex-col justify-between group hover:border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      Case Study
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {project.summary}
                  </p>

                  {project.results && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                      <p className="text-[10px] text-cyan-400 uppercase font-semibold">Outcome:</p>
                      <p className="mt-0.5">{project.results}</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 truncate max-w-[150px]">
                    {project.technologies.split(',').slice(0, 2).join(', ')}
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COURSES / TRAINING OVERVIEW --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Industry Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Practical Technology Courses
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Learn practical skills in Python, Data Science, Machine Learning, and Web Engineering directly from industry engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="p-7 rounded-2xl glass-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {course.duration}
                    </span>
                    <span className="text-slate-400">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">{course.summary}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">Batch</p>
                    <p className="text-xs text-slate-300 font-semibold">{course.batch}</p>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-sm font-bold text-white transition-colors"
            >
              <span>Explore All Academy Cohorts</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOUNDER SPOTLIGHT --- */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/20 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-1 shadow-xl shadow-cyan-500/25 overflow-hidden group">
                  <img
                    src="/founder.jpg"
                    alt={company.founder_name}
                    className="w-full h-full object-cover object-top rounded-[14px] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{company.founder_name}</h3>
                <p className="text-xs font-medium text-cyan-400">{company.founder_role}</p>

                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={`https://github.com/${company.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://${company.personal_website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    aria-label="Personal Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Engineering Leadership
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  Practical Technology. Measurable Value.
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {company.founder_bio}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  {['Python', 'SQL', 'Data Science', 'Machine Learning', 'FastAPI', 'Next.js', 'AI Systems'].map((sk, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST INSIGHTS (BLOG) --- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Industry Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Engineering Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>Read all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {blogs.map((post) => (
              <div key={post.id} className="p-7 rounded-2xl glass-card flex flex-col justify-between group">
                <div>
                  <span className="text-xs font-semibold text-cyan-400">
                    {post.category?.name || 'Technology'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">March 2026</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & GET STARTED SECTION --- */}
      <section className="py-24 bg-slate-950/80 border-t border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
