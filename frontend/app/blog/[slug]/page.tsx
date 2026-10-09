import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Sparkles, Share2 } from 'lucide-react';
import { api } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — JSD Group Engineering`,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at,
      authors: ['JSD Group Engineering'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — JSD Group Engineering`,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {post.category?.name || 'Engineering'}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-400 border-y border-slate-800 py-3">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSD Group Engineering</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>March 2026</span>
            </span>
          </div>
        </div>

        {/* Article Summary Box */}
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 text-slate-200 text-base leading-relaxed italic">
          &quot;{post.summary}&quot;
        </div>

        {/* Article Markdown Content */}
        <article className="prose prose-invert prose-cyan max-w-none text-slate-300 space-y-6 text-base leading-relaxed">
          <div className="whitespace-pre-line">
            {post.content}
          </div>
        </article>

        {/* Bottom CTA */}
        <div className="pt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Have questions about this architecture?</h4>
            <p className="text-xs text-slate-400">Ask Jeesa AI Assistant or talk to our technology lead.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
