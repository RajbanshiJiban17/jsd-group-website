import React from 'react';
import type { Metadata } from 'next';
import { Briefcase, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import CareersListClient from '@/components/CareersListClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description: 'Join the engineering team at JSD Group. Open roles in AI/ML, Python Backend, and Frontend Development in Nepalgunj, Banke and hybrid.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers & Opportunities | JSD Group',
    description: 'Grow your software and AI engineering career with JSD Group in Nepal.',
  },
};

export default async function CareersPage() {
  const jobs = await api.getJobs();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Engineering Core</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Careers at <span className="gradient-text">JSD Group</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Work with practicing engineers on production AI models, high-concurrency backends, and digital products in Nepalgunj and hybrid setups.
          </p>
        </div>

        {/* Jobs List Client with Apply Modal */}
        <CareersListClient jobs={jobs} />
      </div>
    </div>
  );
}
