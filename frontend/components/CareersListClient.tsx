'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Job } from '@/lib/types';
import ApplyJobModal from '@/components/ApplyJobModal';

export default function CareersListClient({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {job.department}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  {job.type}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {job.title}
              </h2>

              <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{job.location}</span>
                <span className="text-slate-600">•</span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.experience_level}</span>
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {job.description}
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    Core Requirements:
                  </span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{job.requirements}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3">
              <button
                onClick={() => handleApply(job)}
                className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
              >
                Apply Now
              </button>

              <Link
                href={`/careers/${job.slug}`}
                className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ApplyJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
