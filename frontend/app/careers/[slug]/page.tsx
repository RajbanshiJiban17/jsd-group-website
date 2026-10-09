import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import JobDetailClient from '@/components/JobDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await api.getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Job Position Not Found',
    };
  }

  return {
    title: `${job.title} | Career Opportunity`,
    description: job.description,
    alternates: {
      canonical: `/careers/${job.slug}`,
    },
    openGraph: {
      title: `${job.title} (${job.department}) — JSD Group Careers`,
      description: job.description,
      url: `/careers/${job.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} — JSD Group Careers`,
      description: job.description,
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await api.getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Positions</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {job.department}
            </span>
            <span className="font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              {job.type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{job.location}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.experience_level}</span>
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <JobDetailClient job={job} />

        {/* Description */}
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Role Overview</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Key Responsibilities</h2>
          <div className="space-y-2.5">
            {job.responsibilities.split('\n').map((res, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Qualifications & Requirements</h2>
          <div className="space-y-2.5">
            {job.requirements.split('\n').map((req, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
