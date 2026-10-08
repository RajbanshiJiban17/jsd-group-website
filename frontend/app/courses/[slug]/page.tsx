import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, BookOpen, Clock, UserCheck, CheckCircle2,
  Calendar, Award, ArrowRight
} from 'lucide-react';
import { api } from '@/lib/api';
import CourseDetailClient from '@/components/CourseDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await api.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses Academy</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {course.duration}
            </span>
            <span className="font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {course.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            {course.summary}
          </p>
        </div>

        {/* Client Detail Action Card with interactive modal */}
        <CourseDetailClient course={course} />

        {/* Detailed Curriculum */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 text-cyan-400">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Full Syllabus & Modules</h2>
          </div>

          <div className="space-y-4">
            {course.curriculum.split('\n').map((mod, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {mod}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
