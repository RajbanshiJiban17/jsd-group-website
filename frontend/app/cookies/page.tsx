import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'JSD Group cookie policy and privacy preferences.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-slate-300">
      <h1 className="text-3xl sm:text-4xl font-black text-white">Cookie Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: January 1, 2026 • JSD Group</p>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. What Are Cookies</h2>
        <p>
          Cookies and local browser storage are small text entities stored on your client device to preserve session preferences, dark/light theme choices, and secure authentication tokens.
        </p>

        <h2 className="text-lg font-bold text-white">2. Cookies We Utilize</h2>
        <p>
          - <b>Essential Session Storage</b>: Maintains conversational context for the Jeesa AI Assistant so you can receive coherent multi-turn responses without authenticating.<br />
          - <b>Theme Preference</b>: Stores your preferred color scheme (Dark mode default or Light mode).<br />
          - <b>Admin Authentication Tokens</b>: Secure JWT tokens for authorized dashboard administrators.
        </p>

        <h2 className="text-lg font-bold text-white">3. Managing Cookie Settings</h2>
        <p>
          You can adjust your browser settings to decline or clear cookies at any time. Doing so will reset your saved theme and start a fresh Jeesa AI session.
        </p>
      </div>
    </div>
  );
}
