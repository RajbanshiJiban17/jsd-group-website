import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'JSD Group terms of service and client engagement standards.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-slate-300">
      <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Service</h1>
      <p className="text-xs text-slate-500">Effective Date: January 1, 2026 • JSD Group</p>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or utilizing the digital properties, web platforms, and software services operated by JSD Group (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
        </p>

        <h2 className="text-lg font-bold text-white">2. Intellectual Property</h2>
        <p>
          All proprietary algorithms, source code, visual designs, trademarks, and documentation related to RetailIQ Nepal and JSD Group platforms remain the exclusive intellectual property of JSD Group.
        </p>

        <h2 className="text-lg font-bold text-white">3. Acceptable Use of AI Assistant (Jeesa AI)</h2>
        <p>
          Users agree not to misuse, attempt security bypasses, initiate prompt injection attacks, or harvest automated data through the Jeesa AI Assistant interface. The assistant provides verified information grounded in company records and allowed technical scopes.
        </p>

        <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
        <p>
          While we strive for 99.9% uptime and verified accuracy across all software products, JSD Group shall not be liable for indirect or consequential damages arising from unforeseen third-party telecom outages or client system incompatibilities.
        </p>

        <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
        <p>
          These terms are governed in accordance with the laws of Nepal. Any disputes arising shall be handled within the jurisdiction of the courts of Banke District, Nepal.
        </p>
      </div>
    </div>
  );
}
