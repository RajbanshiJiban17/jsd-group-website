import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2, ExternalLink, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies',
  description: 'Verified production software, AI applications, and machine learning models engineered by JSD Group with measurable results and public repos.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Engineering Projects & Case Studies | JSD Group',
    description: 'Explore real-world software, AI, and data analytics systems developed by JSD Group.',
  },
};

export default async function ProjectsPage() {
  const projects = await api.getProjects();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Proven Engineering</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Real software systems, predictive machine learning models, and practical AI applications engineered with verified outcomes and accessible source code.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      Case Study 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Metrics
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {project.title}
                  </h2>

                  <p className="text-base text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Problem & Solution Snippet */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {project.problem && (
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block mb-1">
                          The Challenge
                        </span>
                        <p className="text-slate-300 leading-relaxed">{project.problem}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                          Our Engineered Solution
                        </span>
                        <p className="text-slate-300 leading-relaxed">{project.solution}</p>
                      </div>
                    )}
                  </div>

                  {project.results && (
                    <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block">Verified Outcome</span>
                        <p className="mt-0.5">{project.results}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Meta Column */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-2">
                      Technologies Used
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.split(',').map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2.5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                    >
                      <span>Full Architectural Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                      {project.live_demo_url && (
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-xs text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
