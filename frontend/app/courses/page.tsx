import React from 'react';
import type { Metadata } from 'next';
import { BookOpen, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import CoursesListClient from '@/components/CoursesListClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Technology Courses & Engineering Academy',
  description: 'Hands-on practical cohort courses in Python, Data Science, Machine Learning, and Full-Stack Web Development taught by JSD Group engineers in Nepalgunj, Nepal.',
  alternates: {
    canonical: '/courses',
  },
  openGraph: {
    title: 'Technology Courses & Engineering Academy | JSD Group',
    description: 'Learn real production skills in Python, AI, Machine Learning, and Web Engineering.',
  },
};

export default async function CoursesPage() {
  const courses = await api.getCourses();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practical Technical Academy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Technology <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Intensive hands-on cohorts taught by practicing engineers. Build production portfolios in Python, Data Science, Machine Learning, and Web Engineering.
          </p>
        </div>

        {/* Client Courses Grid with Enrollment Modal */}
        <CoursesListClient courses={courses} />
      </div>
    </div>
  );
}
