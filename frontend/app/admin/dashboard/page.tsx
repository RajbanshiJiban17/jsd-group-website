'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, MessageSquare, BookOpen, Briefcase,
  Code2, Cpu, FileText, Bot, Settings, LogOut, CheckCircle2,
  AlertCircle, RefreshCw, Eye, Trash2, Edit3, Plus, UserCheck, Shield
} from 'lucide-react';
import {
  CompanySettings, Project, Service, Course, BlogPost,
  Job, ContactMessage, AIKnowledgeItem, AISettings, DashboardStats,
  CourseEnrollment, JobApplication
} from '@/lib/types';
import { DEFAULT_COMPANY, DEFAULT_PROJECTS, DEFAULT_SERVICES, DEFAULT_COURSES, DEFAULT_JOBS, DEFAULT_BLOGS } from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'messages' | 'enrollments' | 'applications' |
    'projects' | 'services' | 'courses' | 'blog' | 'careers' |
    'ai_settings' | 'ai_knowledge' | 'company'
  >('overview');

  // State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(DEFAULT_BLOGS);
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);
  const [aiSettings, setAiSettings] = useState<AISettings | null>(null);
  const [aiKnowledge, setAiKnowledge] = useState<AIKnowledgeItem[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(DEFAULT_COMPANY);

  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // New item modal states
  const [newKnowledge, setNewKnowledge] = useState({ category: 'FAQ', title: '', content: '', keywords: '' });

  useEffect(() => {
    const savedToken = localStorage.getItem('jsd_admin_token');
    if (!savedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(savedToken);
    loadAllData(savedToken);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadAllData = async (jwt: string) => {
    setIsLoading(true);
    const headers = { Authorization: `Bearer ${jwt}` };

    try {
      const [
        statsRes, msgsRes, enrollRes, appsRes,
        projRes, servRes, courseRes, blogRes,
        jobsRes, aiSetRes, aiKnowRes, compRes
      ] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/contact/admin/messages`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/courses/admin/enrollments`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/careers/admin/applications`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/projects`).then(r => r.ok ? r.json() : DEFAULT_PROJECTS),
        fetch(`${API_BASE}/services`).then(r => r.ok ? r.json() : DEFAULT_SERVICES),
        fetch(`${API_BASE}/courses`).then(r => r.ok ? r.json() : DEFAULT_COURSES),
        fetch(`${API_BASE}/blog`).then(r => r.ok ? r.json() : DEFAULT_BLOGS),
        fetch(`${API_BASE}/careers`).then(r => r.ok ? r.json() : DEFAULT_JOBS),
        fetch(`${API_BASE}/ai/settings`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${API_BASE}/ai/knowledge`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/settings`).then(r => r.ok ? r.json() : DEFAULT_COMPANY)
      ]);

      if (statsRes) setStats(statsRes);
      if (msgsRes) setMessages(msgsRes);
      if (enrollRes) setEnrollments(enrollRes);
      if (appsRes) setApplications(appsRes);
      if (projRes) setProjects(projRes);
      if (servRes) setServices(servRes);
      if (courseRes) setCourses(courseRes);
      if (blogRes) setBlogPosts(blogRes);
      if (jobsRes) setJobs(jobsRes);
      if (aiSetRes) setAiSettings(aiSetRes);
      if (aiKnowRes) setAiKnowledge(aiKnowRes);
      if (compRes) setCompanySettings(compRes);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jsd_admin_token');
    localStorage.removeItem('jsd_admin_user');
    router.push('/admin/login');
  };

  // Toggle Message Status
  const handleToggleRead = async (id: number, current: boolean) => {
    if (!token) return;
    await fetch(`${API_BASE}/contact/admin/messages/${id}/read?is_read=${!current}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: !current } : m));
    showToast('Inquiry status updated');
  };

  const handleDeleteMessage = async (id: number) => {
    if (!token || !confirm('Delete this message?')) return;
    await fetch(`${API_BASE}/contact/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast('Message deleted');
  };

  // Save AI Settings
  const handleSaveAISettings = async () => {
    if (!token || !aiSettings) return;
    await fetch(`${API_BASE}/ai/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        welcome_message: aiSettings.welcome_message,
        thank_you_message: aiSettings.thank_you_message,
        unverified_fallback: aiSettings.unverified_fallback,
        verified_only_mode: aiSettings.verified_only_mode,
        allow_general_tech_answers: aiSettings.allow_general_tech_answers,
        personality_prompt: aiSettings.personality_prompt
      })
    });
    showToast('Jeesa AI settings updated successfully');
  };

  // Add AI Knowledge
  const handleAddAIKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const res = await fetch(`${API_BASE}/ai/knowledge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newKnowledge)
    });
    if (res.ok) {
      const added = await res.json();
      setAiKnowledge(prev => [added, ...prev]);
      setNewKnowledge({ category: 'FAQ', title: '', content: '', keywords: '' });
      showToast('Knowledge item added to Jeesa AI');
    }
  };

  const handleDeleteKnowledge = async (id: number) => {
    if (!token || !confirm('Delete this knowledge item?')) return;
    await fetch(`${API_BASE}/ai/knowledge/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setAiKnowledge(prev => prev.filter(k => k.id !== id));
    showToast('Knowledge item removed');
  };

  // Save Company Settings
  const handleSaveCompany = async () => {
    if (!token) return;
    await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(companySettings)
    });
    showToast('Company settings updated');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-cyan-500/20">
            JSD
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base">JSD Group Command Center</h1>
            <p className="text-[10px] text-slate-400 font-mono">FastAPI + SQLite • Production Admin v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => token && loadAllData(token)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
          <button
            onClick={handleLogout}
            className="p-2 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-64 border-r border-slate-800/80 bg-slate-900/40 p-4 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-2">
            Control Modules
          </div>
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'messages', label: `Inquiries (${messages.filter(m => !m.is_read).length} new)`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'enrollments', label: `Enrollments (${enrollments.length})`, icon: <UserCheck className="w-4 h-4" /> },
            { id: 'applications', label: `Applications (${applications.length})`, icon: <Briefcase className="w-4 h-4" /> },
            { id: 'projects', label: `Projects (${projects.length})`, icon: <Code2 className="w-4 h-4" /> },
            { id: 'services', label: `Services (${services.length})`, icon: <Cpu className="w-4 h-4" /> },
            { id: 'courses', label: `Courses (${courses.length})`, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'blog', label: `Blog (${blogPosts.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'careers', label: `Jobs (${jobs.length})`, icon: <Briefcase className="w-4 h-4" /> },
            { id: 'ai_settings', label: 'Jeesa AI Settings', icon: <Bot className="w-4 h-4" /> },
            { id: 'ai_knowledge', label: `AI Knowledge (${aiKnowledge.length})`, icon: <Shield className="w-4 h-4" /> },
            { id: 'company', label: 'Company Info', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              <span>Loading administration state...</span>
            </div>
          ) : (
            <>
              {/* --- TAB 1: OVERVIEW STATS --- */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-black text-white">Platform Health & Metrics</h2>
                    <p className="text-xs text-slate-400 mt-1">Live SQLite aggregated records from production database.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Unread Inquiries', val: stats?.unread_inquiries ?? 0, highlight: true },
                      { label: 'Total Inquiries', val: stats?.total_inquiries ?? 0 },
                      { label: 'Course Enrollments', val: stats?.total_enrollments ?? 0 },
                      { label: 'Job Applications', val: stats?.total_applications ?? 0 },
                      { label: 'AI Conversations', val: stats?.total_ai_conversations ?? 0 },
                      { label: 'Verified Projects', val: stats?.total_projects ?? 0 },
                      { label: 'Active Services', val: stats?.total_services ?? 0 },
                      { label: 'Active Courses', val: stats?.total_courses ?? 0 },
                      { label: 'Published Blogs', val: stats?.total_blog_posts ?? 0 },
                      { label: 'Open Jobs', val: stats?.total_jobs ?? 0 },
                    ].map((st, i) => (
                      <div key={i} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500">{st.label}</span>
                        <p className={`text-2xl font-black ${st.highlight ? 'text-amber-400' : 'text-white'}`}>
                          {st.val}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Quick summary cards */}
                  <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white">System Environment</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
                      <div>Database: <span className="text-cyan-400">SQLite (jsd_group.db)</span></div>
                      <div>Backend Engine: <span className="text-cyan-400">FastAPI 0.110+ (Python 3.12)</span></div>
                      <div>Jeesa AI Mode: <span className="text-emerald-400">Verified-Only Grounding (ON)</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 2: INQUIRIES / MESSAGES --- */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white">Inquiries &amp; Messages</h2>
                      <p className="text-xs text-slate-400">Incoming inquiries from prospective clients and partners.</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {messages.length} Total
                    </span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl glass-card text-slate-400 text-sm">
                      No customer inquiries logged yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-6 rounded-2xl glass-card border ${
                            m.is_read ? 'border-slate-800' : 'border-cyan-500/40 bg-cyan-950/10'
                          } space-y-3`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-white text-base">{m.name}</h4>
                              <p className="text-xs text-slate-400">
                                {m.email} {m.phone ? `• ${m.phone}` : ''} {m.company ? `• Company: ${m.company}` : ''}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleRead(m.id, m.is_read)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                  m.is_read
                                    ? 'bg-slate-800 text-slate-400'
                                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                }`}
                              >
                                {m.is_read ? 'Mark Unread' : 'Mark Read'}
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(m.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-4 text-xs font-mono text-cyan-400">
                            {m.service_interest && <span>Service: {m.service_interest}</span>}
                            {m.budget && <span>Budget: {m.budget}</span>}
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 3: COURSE ENROLLMENTS --- */}
              {activeTab === 'enrollments' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">Student Course Enrollments</h2>
                    <p className="text-xs text-slate-400">Direct applicant registrations for technical training batches.</p>
                  </div>

                  {enrollments.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl glass-card text-slate-400 text-sm">
                      No enrollments recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enrollments.map((en) => (
                        <div key={en.id} className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                          <div>
                            <h4 className="font-bold text-white text-sm">{en.student_name}</h4>
                            <p className="text-slate-400 mt-0.5">{en.student_email} • {en.student_phone}</p>
                            {en.notes && <p className="text-slate-500 mt-1 italic">&quot;{en.notes}&quot;</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono">
                              Course ID: {en.course_id}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase text-[10px]">
                              {en.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 4: JOB APPLICATIONS --- */}
              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">Candidate Job Applications</h2>
                    <p className="text-xs text-slate-400">Engineering candidates and interns applying for open positions.</p>
                  </div>

                  {applications.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl glass-card text-slate-400 text-sm">
                      No job applications submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div key={app.id} className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                          <div>
                            <h4 className="font-bold text-white text-sm">{app.name}</h4>
                            <p className="text-slate-400 mt-0.5">{app.email} • {app.phone}</p>
                            {app.cover_letter && <p className="text-slate-500 mt-1 italic">&quot;{app.cover_letter}&quot;</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            {app.cv_url && (
                              <a
                                href={app.cv_url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300"
                              >
                                View CV / Portfolio
                              </a>
                            )}
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase text-[10px]">
                              {app.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 10: JEESA AI SETTINGS --- */}
              {activeTab === 'ai_settings' && aiSettings && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-black text-white">Jeesa AI Assistant Controls</h2>
                    <p className="text-xs text-slate-400">Configure hallucination barriers, prompt behavior, and greetings.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">Verified Information Only Mode</h4>
                        <p className="text-xs text-slate-400">Prevents unsupported claims about revenue, private clients, awards.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={aiSettings.verified_only_mode}
                        onChange={(e) => setAiSettings({ ...aiSettings, verified_only_mode: e.target.checked })}
                        className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">Allow General Technology Knowledge</h4>
                        <p className="text-xs text-slate-400">Allows concise answers for Python, SQL, Machine Learning concepts.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={aiSettings.allow_general_tech_answers}
                        onChange={(e) => setAiSettings({ ...aiSettings, allow_general_tech_answers: e.target.checked })}
                        className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Welcome Message (First Open)
                      </label>
                      <textarea
                        rows={2}
                        value={aiSettings.welcome_message}
                        onChange={(e) => setAiSettings({ ...aiSettings, welcome_message: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Thank You Response (Dhanyabad / Thanks)
                      </label>
                      <textarea
                        rows={2}
                        value={aiSettings.thank_you_message}
                        onChange={(e) => setAiSettings({ ...aiSettings, thank_you_message: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Unverified Fallback Response
                      </label>
                      <textarea
                        rows={2}
                        value={aiSettings.unverified_fallback}
                        onChange={(e) => setAiSettings({ ...aiSettings, unverified_fallback: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Personality System Prompt
                      </label>
                      <textarea
                        rows={3}
                        value={aiSettings.personality_prompt}
                        onChange={(e) => setAiSettings({ ...aiSettings, personality_prompt: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <button
                      onClick={handleSaveAISettings}
                      className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                    >
                      Save Jeesa AI Settings
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 11: AI KNOWLEDGE BASE --- */}
              {activeTab === 'ai_knowledge' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">AI Knowledge Base (RAG)</h2>
                    <p className="text-xs text-slate-400">Ground truth entries retrieved by Jeesa AI to answer visitor questions.</p>
                  </div>

                  {/* Add New Knowledge */}
                  <form onSubmit={handleAddAIKnowledge} className="p-6 rounded-2xl glass-card border border-cyan-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-cyan-400" />
                      <span>Add Verified Knowledge Item</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Category</label>
                        <select
                          value={newKnowledge.category}
                          onChange={(e) => setNewKnowledge({ ...newKnowledge, category: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        >
                          {['Company', 'Founder', 'Services', 'Projects', 'Courses', 'Contact', 'FAQ'].map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Title / Question</label>
                        <input
                          type="text"
                          required
                          value={newKnowledge.title}
                          onChange={(e) => setNewKnowledge({ ...newKnowledge, title: e.target.value })}
                          placeholder="e.g. Office Timings"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Verified Content</label>
                      <textarea
                        required
                        rows={3}
                        value={newKnowledge.content}
                        onChange={(e) => setNewKnowledge({ ...newKnowledge, content: e.target.value })}
                        placeholder="Write exact verified answer..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Keywords (comma separated)</label>
                      <input
                        type="text"
                        value={newKnowledge.keywords}
                        onChange={(e) => setNewKnowledge({ ...newKnowledge, keywords: e.target.value })}
                        placeholder="e.g. timing, hours, sunday"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300"
                    >
                      Add Knowledge Entry
                    </button>
                  </form>

                  {/* List Knowledge Items */}
                  <div className="space-y-3">
                    {aiKnowledge.map((k) => (
                      <div key={k.id} className="p-4 rounded-xl glass-card border border-slate-800 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                              {k.category}
                            </span>
                            <h4 className="text-xs font-bold text-white">{k.title}</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{k.content}</p>
                          {k.keywords && (
                            <p className="text-[10px] text-slate-500 font-mono mt-1">Keywords: {k.keywords}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteKnowledge(k.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 12: COMPANY INFO --- */}
              {activeTab === 'company' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h2 className="text-2xl font-black text-white">Company Information</h2>
                    <p className="text-xs text-slate-400">All company metadata editable directly from admin.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={companySettings.company_name}
                          onChange={(e) => setCompanySettings({ ...companySettings, company_name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={companySettings.tagline}
                          onChange={(e) => setCompanySettings({ ...companySettings, tagline: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Founder Name</label>
                        <input
                          type="text"
                          value={companySettings.founder_name}
                          onChange={(e) => setCompanySettings({ ...companySettings, founder_name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Founder Role</label>
                        <input
                          type="text"
                          value={companySettings.founder_role}
                          onChange={(e) => setCompanySettings({ ...companySettings, founder_role: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Telephone</label>
                        <input
                          type="text"
                          value={companySettings.phone}
                          onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Email</label>
                        <input
                          type="email"
                          value={companySettings.email}
                          onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Headquarters Location</label>
                      <input
                        type="text"
                        value={companySettings.location}
                        onChange={(e) => setCompanySettings({ ...companySettings, location: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Founder Bio</label>
                      <textarea
                        rows={3}
                        value={companySettings.founder_bio}
                        onChange={(e) => setCompanySettings({ ...companySettings, founder_bio: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <button
                      onClick={handleSaveCompany}
                      className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
                    >
                      Save Company Settings
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 5, 6, 7, 8, 9: CATALOGS --- */}
              {['projects', 'services', 'courses', 'blog', 'careers'].includes(activeTab) && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white capitalize">{activeTab} Management</h2>
                      <p className="text-xs text-slate-400">Manage database entries for {activeTab}.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl glass-card border border-slate-800 space-y-4">
                    <p className="text-xs text-slate-400">
                      All {activeTab} records are connected to the live SQLite database (`jsd_group.db`) and synchronized in real-time.
                    </p>
                    <div className="space-y-2">
                      {activeTab === 'projects' && projects.map(p => (
                        <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{p.title}</span>
                          <span className="text-cyan-400 font-mono">Slug: {p.slug}</span>
                        </div>
                      ))}
                      {activeTab === 'services' && services.map(s => (
                        <div key={s.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{s.title}</span>
                          <span className="text-cyan-400 font-mono">Icon: {s.icon}</span>
                        </div>
                      ))}
                      {activeTab === 'courses' && courses.map(c => (
                        <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{c.title}</span>
                          <span className="text-cyan-400 font-mono">Batch: {c.batch}</span>
                        </div>
                      ))}
                      {activeTab === 'blog' && blogPosts.map(b => (
                        <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{b.title}</span>
                          <span className="text-cyan-400 font-mono">Slug: {b.slug}</span>
                        </div>
                      ))}
                      {activeTab === 'careers' && jobs.map(j => (
                        <div key={j.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{j.title}</span>
                          <span className="text-cyan-400 font-mono">{j.department} • {j.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
