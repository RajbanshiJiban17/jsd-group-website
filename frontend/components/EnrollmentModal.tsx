'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Course } from '@/lib/types';
import { api } from '@/lib/api';

interface EnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollmentModal({ course, isOpen, onClose }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.enrollCourse({
        course_id: course.id,
        student_name: formData.student_name,
        student_email: formData.student_email,
        student_phone: formData.student_phone,
        notes: formData.notes
      });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ student_name: '', student_email: '', student_phone: '', notes: '' });
        onClose();
      }, 2500);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Enrollment submission failed. Please try again.');
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
            Admissions Open
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-2">
            Enroll in {course.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Duration: <span className="text-slate-200">{course.duration}</span> • Batch: <span className="text-cyan-400">{course.batch}</span>
          </p>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-white">Enrollment Registered!</h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Welcome! JSD Group will contact you at <b>{formData.student_email}</b> with syllabus materials and batch schedules.
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
                value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                placeholder="e.g. Sunil Thapa"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.student_email}
                  onChange={(e) => setFormData({ ...formData, student_email: e.target.value })}
                  placeholder="sunil@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.student_phone}
                  onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
                  placeholder="9868xxxxxx"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Background / Goals (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us about your background or what you hope to achieve..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all disabled:opacity-50 mt-2"
            >
              {status === 'loading' ? 'Submitting Application...' : 'Confirm Enrollment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
