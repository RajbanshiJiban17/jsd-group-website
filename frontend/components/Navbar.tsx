'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import BrandLogo from '@/components/BrandLogo';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Projects', href: '/projects' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-lg shadow-black/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="JSD Group Home">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Let's Talk CTA */}
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Open mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-800 mt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
