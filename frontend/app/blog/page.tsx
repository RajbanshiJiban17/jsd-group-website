import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Engineering & AI Blog',
  description: 'Technical insights, tutorials, and practical perspectives on Machine Learning, Full-Stack Architecture, and AI Systems from JSD Group engineers in Nepal.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Engineering & AI Blog | JSD Group',
    description: 'Practical technology insights, machine learning architecture, and software design.',
  },
};

export default async function BlogPage() {
  const posts = await api.getBlogPosts();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Engineering & <span className="gradient-text">AI Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Articles, tutorials, and practical reflections on machine learning, full-stack architecture, and digital engineering from the JSD Group engineering team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40"
            >
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {post.category?.name || 'Engineering'}
                </span>

                <h2 className="text-2xl font-bold text-white mt-4 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>March 2026</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
