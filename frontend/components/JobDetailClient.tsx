'use client';

import React, { useState } from 'react';
import { Job } from '@/lib/types';
import ApplyJobModal from '@/components/ApplyJobModal';

export default function JobDetailClient({ job }: { job: Job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs text-slate-400">Position Status</p>
          <p className="text-sm font-bold text-emerald-400">Actively Reviewing Applications</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
        >
          Submit Your Application
        </button>
      </div>

      <ApplyJobModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
