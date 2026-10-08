'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, UploadCloud } from 'lucide-react';
import { Job } from '@/lib/types';
import { api } from '@/lib/api';

interface ApplyJobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyJobModal({ job, isOpen, onClose }: ApplyJobModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    cv_url: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.applyJob({
        job_id: job.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cover_letter: formData.cover_letter,
        cv_url: formData.cv_url
      });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', cover_letter: '', cv_url: '' });
        onClose();
      }, 2500);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Job application submission failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl glass-panel border border-cyan-500/30 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {job.department} • {job.type}
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-2">
            Apply for {job.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Location: {job.location}</p>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-white">Application Received!</h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <b>{formData.name}</b>. Our engineering team reviews all applications carefully and will reach out to you directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anjali Sharma"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="anjali@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98xxxxxxxx"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                CV / Portfolio Link (Google Drive / GitHub / LinkedIn) *
              </label>
              <input
                type="url"
                required
                value={formData.cv_url}
                onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
                placeholder="https://drive.google.com/... or https://github.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Brief Cover Note (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                placeholder="Tell us what excites you about this role..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all disabled:opacity-50 mt-2"
            >
              {status === 'loading' ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
