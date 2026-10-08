import React from 'react';
import Link from 'next/link';
import {
  Compass, Eye, Award, CheckCircle2,
  Globe, Mail, Phone, MapPin, Sparkles, ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const company = await api.getCompanySettings();

  const VALUES = [
    { title: "Innovation", desc: "Leveraging state-of-the-art machine learning, AI architectures, and modern web frameworks to solve tangible problems." },
    { title: "Quality", desc: "Writing clean, tested, modular, and maintainable software with strict typed contracts and resilient database patterns." },
    { title: "Transparency", desc: "Straightforward communication, realistic project milestones, and grounded claims without hype or fabricated metrics." },
    { title: "Customer Success", desc: "Building systems that generate observable returns on investment and optimize active business operations." },
    { title: "Continuous Learning", desc: "Relentless curiosity and adaptation to evolving software architectures and AI research breakthroughs." },
    { title: "Responsible Technology", desc: "Adhering to ethical AI guidelines, strict data privacy protocols, and defensible security standards." }
  ];

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Profile</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            About <span className="gradient-text">JSD Group</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            {company.description}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-cyan-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-base text-slate-300 leading-relaxed">
              &quot;{company.mission}&quot;
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-base text-slate-300 leading-relaxed">
              &quot;{company.vision}&quot;
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">Guiding Principles</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800">
                <div className="flex items-center gap-2.5 text-cyan-400 font-bold mb-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3 className="text-lg text-white">{val.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Section */}
        <div className="p-8 sm:p-14 rounded-3xl glass-panel border border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 p-1.5 shadow-2xl shadow-cyan-500/25 overflow-hidden">
                <img
                  src="/founder.jpg"
                  alt={company.founder_name}
                  className="w-full h-full object-cover object-top rounded-[20px]"
                />
              </div>
              <h3 className="text-2xl font-black text-white mt-5">{company.founder_name}</h3>
              <p className="text-sm font-semibold text-cyan-400">{company.founder_role}</p>

              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`https://github.com/${company.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://${company.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://${company.personal_website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all"
                  aria-label="Personal Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500">
                Founder Biography & Leadership
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight">
                Architecting Practical Digital Engineering
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {company.founder_bio}
              </p>
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Verified Technical Areas:
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {['Python', 'SQL', 'Data Science', 'Machine Learning', 'AI', 'FastAPI', 'Web Development', 'Software Development'].map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 flex flex-wrap gap-6 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{company.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-black text-white">Let&apos;s Build Together</h2>
          <p className="text-slate-400 text-sm">
            Whether you are exploring customized AI workflows or enterprise application modernization, our engineering team is ready to consult.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-lg shadow-cyan-500/25"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
