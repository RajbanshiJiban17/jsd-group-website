'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

const SERVICE_OPTIONS = [
  "AI Solutions & Machine Learning",
  "AI Automation & LLMs",
  "Data Analysis & Business Intelligence",
  "Custom Web Application (Next.js)",
  "Enterprise Software Development (FastAPI)",
  "Cross-Platform Mobile App",
  "RetailIQ Nepal Platform Setup",
  "IT Consulting & Digital Strategy",
  "Corporate IT Training",
  "Other / Custom Inquiry"
];

const BUDGET_OPTIONS = [
  "Under NPR 50,000",
  "NPR 50,000 - 1,50,000",
  "NPR 1,50,000 - 3,50,000",
  "NPR 3,50,000 - 8,00,000",
  "NPR 8,00,000+",
  "Exploring / To be discussed"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.submitContact(formData);
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_interest: SERVICE_OPTIONS[0],
          budget: BUDGET_OPTIONS[1],
          message: ''
        });
      }, 4000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again or email us directly.');
    }
  };

  return (
    <div className="rounded-3xl glass-card p-6 sm:p-10 border border-slate-800">
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Start a Project with JSD Group
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Tell us about your project objectives. Our technology lead will review and respond within 24 business hours.
        </p>
      </div>

      {status === 'success' ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Thank you, <b>{formData.name}</b>. A confirmation notification has been sent to our founders at <b>jibanchy233@gmail.com</b>. We will be in touch shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Bipin Shrestha"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="bipin@company.com"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone Number (Nepal)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="98xxxxxxxx"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Everest Agro Hub"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Service of Interest
              </label>
              <select
                value={formData.service_interest}
                onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {SERVICE_OPTIONS.map((srv, idx) => (
                  <option key={idx} value={srv} className="bg-slate-900 text-white">
                    {srv}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Estimated Project Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {BUDGET_OPTIONS.map((b, idx) => (
                  <option key={idx} value={b} className="bg-slate-900 text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Project Description & Requirements *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your current business problem, technical targets, and any specific timelines..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <span>{status === 'loading' ? 'Transmitting Inquiry...' : 'Submit Project Inquiry'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
