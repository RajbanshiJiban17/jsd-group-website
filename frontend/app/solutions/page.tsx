import React from 'react';
import Link from 'next/link';
import {
  Sparkles, Layers, BarChart3, Package, Bot, ArrowRight,
  CheckCircle2, ShieldCheck, Zap, Database, Server
} from 'lucide-react';
import RetailIQShowcase from '@/components/RetailIQShowcase';

export default function SolutionsPage() {
  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Productized Platforms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Enterprise <span className="gradient-text">Solutions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Specialized platforms engineered by JSD Group to resolve core operational inefficiencies for businesses across Nepal and beyond.
          </p>
        </div>

        {/* Deep Dive on RetailIQ Nepal */}
        <RetailIQShowcase />

        {/* Enterprise AI Knowledge & RAG Solution Showcase */}
        <div className="p-8 sm:p-14 rounded-3xl glass-panel border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5" />
                <span>Enterprise AI System</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Retrieval-Augmented Generation (RAG) & Corporate Knowledge
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Empower your organization to query thousands of internal contracts, technical manuals, SOPs, and financial audits with zero hallucination. Our RAG engine extracts exact, verifiable source citations before formulating answers.
              </p>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Sub-second semantic search across PDFs, Excel sheets, and databases.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Strict anti-hallucination guardrails: only verified internal documents cited.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Role-based access control protecting confidential employee & executive records.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact?service=AI+Automation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>Request Enterprise RAG Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Architecture Matrix Diagram */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
              <div className="pb-3 border-b border-slate-800 text-cyan-400 font-bold flex items-center justify-between">
                <span>RAG Pipeline Architecture</span>
                <span className="text-[10px] text-emerald-400 uppercase">Production Grade</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">1. Ingestion Layer</span>
                  <span className="text-white font-semibold">Document Parser & Chunker</span> (PDF, DOCX, SQL Tables)
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">2. Vector Indexing</span>
                  <span className="text-white font-semibold">Hybrid Search Index</span> (SQLite Vector / FAISS + BM25)
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">3. Grounding & Guardrails</span>
                  <span className="text-white font-semibold">Strict Verification Engine</span> (Hallucination-free output)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
