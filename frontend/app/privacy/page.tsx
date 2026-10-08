import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-slate-300">
      <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: January 1, 2026 • JSD Group</p>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-white">1. Information Collection</h2>
        <p>
          JSD Group collects information provided voluntarily when you submit an inquiry, request a product demonstration for RetailIQ Nepal, enroll in a technology course, or apply for an open engineering position. This may include your full name, email address, telephone number, organization name, and attached resume or cover letter.
        </p>

        <h2 className="text-lg font-bold text-white">2. Use of Collected Data</h2>
        <p>
          We use the collected information exclusively to fulfill customer service requests, process course admissions, evaluate job applications, and improve our artificial intelligence algorithms. We do not sell, rent, or trade your personal information to third-party advertisers.
        </p>

        <h2 className="text-lg font-bold text-white">3. Jeesa AI Assistant Interactions</h2>
        <p>
          Conversations with Jeesa AI are anonymized by session identifiers to optimize query retrieval accuracy. Jeesa AI does not collect or expose sensitive credentials, financial passwords, or private customer records.
        </p>

        <h2 className="text-lg font-bold text-white">4. Data Security</h2>
        <p>
          We employ industry-standard encryption, token-based authentication, and strict access controls to protect all data stored in our databases.
        </p>

        <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
        <p>
          For privacy inquiries or data removal requests, contact us at <b>jibanchy233@gmail.com</b> or visit our headquarters at Nepalgunj-10, Adarshnagar, Banke, Nepal.
        </p>
      </div>
    </div>
  );
}
