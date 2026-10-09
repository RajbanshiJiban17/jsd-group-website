import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain, Bot, BarChart3, Cpu, Globe, Code2, Smartphone,
  Zap, TrendingUp, Compass, Server, GraduationCap, ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Technology Services & AI Solutions',
  description: 'Explore JSD Group services in Artificial Intelligence, Machine Learning, Data Analytics, Cloud Backend, and Modern Web Engineering in Nepal.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Technology Services & AI Solutions | JSD Group',
    description: 'Custom AI model development, high-throughput backend APIs, and enterprise digital solutions tailored for your business.',
  },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export default async function ServicesPage() {
  const services = await api.getServices();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            JSD Group provides full-lifecycle engineering from bespoke artificial intelligence systems and machine learning models to production web applications, business automation, and enterprise IT infrastructure.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const iconNode = ICON_MAP[service.icon] || <Cpu className="w-6 h-6" />;
            return (
              <div
                key={service.id}
                className="p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    {iconNode}
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {service.short_description}
                  </p>

                  {service.full_description && (
                    <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                      {service.full_description}
                    </p>
                  )}

                  {service.benefits && (
                    <div className="mt-5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Key Business Value</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{service.benefits}</p>
                    </div>
                  )}

                  {service.use_cases && (
                    <div className="mt-3 text-xs text-slate-400">
                      <span className="text-slate-500 font-semibold uppercase text-[10px] block">Use Cases:</span>
                      <p className="mt-0.5">{service.use_cases}</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">
                      Technologies
                    </span>
                    <p className="text-xs font-mono text-cyan-300">
                      {service.technologies}
                    </p>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
