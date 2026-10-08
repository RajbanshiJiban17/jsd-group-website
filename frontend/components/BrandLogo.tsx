'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function LogoIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(6,182,212,0.35)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Main Primary Glow Filter */}
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.45" />
          </filter>

          {/* Futuristic Hex Gradients */}
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#082f49" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="borderGrad" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Monogram J-Ribbon Gradient */}
          <linearGradient id="ribbonJ" x1="8" y1="12" x2="28" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Monogram S-Ribbon Gradient */}
          <linearGradient id="ribbonS" x1="16" y1="12" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Monogram D-Ribbon Gradient */}
          <linearGradient id="ribbonD" x1="26" y1="10" x2="48" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="60%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          <radialGradient id="quantumCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Base Isometric Shield Hexagon */}
        <path
          d="M27 3.5L47.5 14.5V36.5L27 47.5L6.5 36.5V14.5L27 3.5Z"
          fill="url(#shieldGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* 2. Inner Tech Circuit Background Grid Lines */}
        <path
          d="M27 4V24.5M27 24.5L46 35.5M27 24.5L8 35.5"
          stroke="#38bdf8"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* 3. The 'J' Stroke: Graceful left descent & upward anchor */}
        <path
          d="M14 17.5H23V29.5C23 33.5 20 36 16.5 36C13.5 36 11.5 34 11.5 31.5"
          stroke="url(#ribbonJ)"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. The 'S' Central Dynamic S-Curve connecting AI nodes */}
        <path
          d="M33 18.5C31 16.5 26.5 16 23.5 18C20 20.5 21 24 27 25.5C33 27 34 30.5 30.5 33C27 35.5 21.5 34.5 19.5 32"
          stroke="url(#ribbonS)"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. The 'D' Forward Expansion Arc */}
        <path
          d="M27 15H33C39.5 15 42 20.5 42 25.5C42 30.5 39.5 36 33 36H27"
          stroke="url(#ribbonD)"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 6. Neural AI Quantum Spark Node */}
        <circle cx="27" cy="25.5" r="3.5" fill="url(#quantumCore)" />
        <circle cx="27" cy="25.5" r="1.5" fill="#ffffff" />

        {/* 7. Precision Corner Tech Pins */}
        <circle cx="27" cy="6" r="1" fill="#38bdf8" />
        <circle cx="45" cy="16" r="1" fill="#818cf8" />
        <circle cx="45" cy="35" r="1" fill="#06b6d4" />
        <circle cx="27" cy="45" r="1" fill="#38bdf8" />
        <circle cx="9" cy="35" r="1" fill="#818cf8" />
        <circle cx="9" cy="16" r="1" fill="#06b6d4" />
      </svg>
    </div>
  );
}

export default function BrandLogo({
  size = 'md',
  showText = true,
  className = '',
}: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[12px]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Precision Emblem Mark */}
      <LogoIcon className={iconSizes[size]} />

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-none text-white group-hover:text-cyan-300 transition-colors ${textSizes[size]}`}
              style={{ letterSpacing: '-0.02em' }}
            >
              JSD
            </span>
            <span
              className={`font-black tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 ${textSizes[size]}`}
            >
              GROUP
            </span>
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            </span>
          </div>

          <span
            className={`font-semibold uppercase tracking-[0.18em] text-slate-400 group-hover:text-slate-300 transition-colors mt-1 ${subtextSizes[size]}`}
          >
            Intelligent Solutions
          </span>
        </div>
      )}
    </div>
  );
}
