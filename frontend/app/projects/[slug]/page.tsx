import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, CheckCircle2, Server,
  Layers, Code2, ArrowRight
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { api } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await api.getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — JSD Group Engineering`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — JSD Group Engineering`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await api.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Catalog</span>
        </Link>

        {/* Title & Summary */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              Verified Case Study
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Production Tested
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Action Links & Tech Stack Bar */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.split(',').map((tech, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.problem && (
            <div className="p-8 rounded-3xl glass-card border border-rose-500/20 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-400 block">
                The Business & Engineering Problem
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="p-8 rounded-3xl glass-card border border-emerald-500/20 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">
                The JSD Engineered Solution
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* Architecture Specifications */}
        {project.architecture && (
          <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Server className="w-5 h-5" />
              <h2 className="text-xl text-white">System Architecture & Pipeline</h2>
            </div>
            <pre className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {project.architecture}
            </pre>
          </div>
        )}

        {/* Features Checklist */}
        {project.features && (
          <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-white">Core System Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.split('\n').map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Results */}
        {project.results && (
          <div className="p-8 rounded-3xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
              Measurable Results & Metrics
            </span>
            <p className="text-base text-slate-200 font-medium">
              {project.results}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-8 text-center space-y-4 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-white">Interested in a Similar Solution?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Discuss your technical goals directly with our engineering team in Nepalgunj.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Request Technical Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
