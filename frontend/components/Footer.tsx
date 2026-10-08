'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Shield, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="tech-glow top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="JSD Group Home">
              <BrandLogo size="lg" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              JSD Group is a technology and digital solutions company focused on building practical software, AI-powered systems, data-driven solutions and digital products.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/RajbanshiJiban17"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/jiban-chaudhary-732698384"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://JibanChaudhary1.com.np"
                target="_blank"
                rel="noreferrer"
                aria-label="Founder Portfolio"
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Our Services</Link></li>
              <li><Link href="/solutions" className="hover:text-cyan-400 transition-colors">Solutions (RetailIQ)</Link></li>
              <li><Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects Portfolio</Link></li>
              <li><Link href="/courses" className="hover:text-cyan-400 transition-colors">Training & Courses</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Tech Blog</Link></li>
              <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers & Hiring</Link></li>
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">AI Solutions & LLMs</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">AI Automation</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Data Analysis & BI</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Machine Learning Models</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Next.js Web Development</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">FastAPI Backend Systems</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Digital Marketing & SEO</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Nepalgunj-10, Adarshnagar, Banke, Nepal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:9868837762" className="hover:text-cyan-400 transition-colors">9868837762</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:jibanchy233@gmail.com" className="hover:text-cyan-400 transition-colors">jibanchy233@gmail.com</a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold hover:underline"
                >
                  <span>Submit an inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 JSD Group. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-400 transition-colors">Cookie Policy</Link>
            <Link href="/admin/login" className="hover:text-cyan-400 flex items-center gap-1 text-slate-400">
              <Shield className="w-3 h-3 text-cyan-500" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
