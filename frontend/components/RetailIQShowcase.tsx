'use client';

import React, { useState } from 'react';
import {
  TrendingUp, PackageCheck, AlertTriangle, Sparkles, CheckCircle2,
  BarChart3, ArrowRight, Layers, ShieldCheck, X
} from 'lucide-react';

export default function RetailIQShowcase() {
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'ai'>('sales');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', phone: '', company: '', city: 'Nepalgunj' });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ name: '', phone: '', company: '', city: 'Nepalgunj' });
    }, 2500);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/80">
      {/* Background radial glow */}
      <div className="tech-glow top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Product</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            RetailIQ Nepal
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Enterprise-grade business intelligence and automated inventory prediction designed specifically for Small & Medium Enterprises (SMEs) across Nepal.
          </p>
        </div>

        {/* Interactive Feature Tabs + Preview Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => setActiveTab('sales')}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                activeTab === 'sales'
                  ? 'glass-card border-cyan-500/40 bg-slate-900/90 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/70 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Sales Analytics & Dashboard</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live visibility into gross margin trends, daily transaction volumes, and top-performing item categories.
              </p>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                activeTab === 'inventory'
                  ? 'glass-card border-cyan-500/40 bg-slate-900/90 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/70 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Low Stock Detection & Dead-stock</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated threshold alarms identify items nearing zero before you miss sales, while flagging stagnant capital.
              </p>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                activeTab === 'ai'
                  ? 'glass-card border-cyan-500/40 bg-slate-900/90 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/70 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">AI-Assisted Business Insights</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Machine learning models compute customer purchase velocity and estimate seasonal demand spikes in plain Nepali/English.
              </p>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-500/25"
              >
                <span>Request Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Mockup Console */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-5 sm:p-6 relative">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">retailiq.jsdgroup.com/console</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Analytics
                </span>
              </div>

              {/* Tab 1: Sales Analytics Content */}
              {activeTab === 'sales' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Monthly Revenue</p>
                      <p className="text-lg sm:text-xl font-bold text-white mt-1">NPR 4,82,500</p>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="w-3 h-3" /> +18.4% vs last mo
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Gross Margin</p>
                      <p className="text-lg sm:text-xl font-bold text-white mt-1">26.8%</p>
                      <span className="text-[10px] text-cyan-400 mt-0.5 inline-block">Healthy band</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Orders Logged</p>
                      <p className="text-lg sm:text-xl font-bold text-white mt-1">1,248</p>
                      <span className="text-[10px] text-indigo-400 mt-0.5 inline-block">99.4% fulfilled</span>
                    </div>
                  </div>

                  {/* Mock Chart Bars */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Weekly Sales Distribution (Nepalgunj Market)</span>
                      <span className="text-cyan-400 font-mono">Mon-Sun</span>
                    </div>
                    <div className="h-28 flex items-end gap-3 pt-4 px-2">
                      {[40, 65, 55, 90, 80, 95, 70].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <div
                            style={{ height: `${val}%` }}
                            className="w-full rounded-t-md bg-gradient-to-t from-cyan-600 to-sky-400 hover:brightness-125 transition-all"
                          />
                          <span className="text-[10px] text-slate-500 font-mono">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Inventory Content */}
              {activeTab === 'inventory' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span><b>Attention:</b> 3 items have breached safety reorder threshold.</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { item: 'Industrial Sensor Module X-1', stock: 4, thresh: 15, status: 'Critical' },
                      { item: 'IoT Controller Motherboard v2', stock: 9, thresh: 20, status: 'Low' },
                      { item: 'Power Supply 24V 5A DIN-Rail', stock: 68, thresh: 30, status: 'Optimal' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                        <div>
                          <p className="font-semibold text-white">{row.item}</p>
                          <p className="text-[11px] text-slate-400">Stock: {row.stock} / Safety Threshold: {row.thresh}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          row.status === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          row.status === 'Low' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: AI Insights Content */}
              {activeTab === 'ai' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>JSD Predictive Insight (Nepali SME Engine)</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      &quot;Based on the past 60 days of transaction velocity in Banke district, weekend inventory consumption spikes by <b>34%</b>. Reordering 25 units of Power Supply units today will avert an estimated NPR 42,000 lost revenue risk.&quot;
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span>Forecast Confidence Rating</span>
                    <span className="font-mono text-cyan-400 font-bold">94.2%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-cyan-500/30 p-6 relative">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">Request RetailIQ Demo</h3>
            <p className="text-xs text-slate-400 mt-1">
              Experience personalized retail and inventory analytics tailored to your company.
            </p>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Demo Requested!</h4>
                <p className="text-xs text-slate-400">Our engineering lead will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Thapa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (Nepal)</label>
                  <input
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    placeholder="98xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Store Name</label>
                  <input
                    type="text"
                    required
                    value={demoForm.company}
                    onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                    placeholder="e.g. Adarsh Trading Enterprises"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all mt-2"
                >
                  Schedule Demo Session
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
