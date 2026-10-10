import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JeesaAIChat from "@/components/JeesaAIChat";

export const metadata: Metadata = {
  title: {
    default: "JSD Group | Building Intelligent Solutions for a Digital Future",
    template: "%s | JSD Group",
  },
  description: "JSD Group is a premier technology company based in Nepalgunj, Banke, Nepal, specializing in practical AI Solutions, Machine Learning, Data Analytics, FastAPI and Next.js Enterprise Software Development.",
  keywords: [
    "JSD Group",
    "JSD Group Nepal",
    "AI Solutions Nepal",
    "AI Automation Nepal",
    "Software Development Nepal",
    "Data Analytics Nepal",
    "Web Development Nepalgunj",
    "IT Services Nepalgunj",
    "Machine Learning Nepal",
    "Jiban Chaudhary",
    "RetailIQ Nepal"
  ],
  authors: [{ name: "JSD Group", url: "https://JibanChaudhary1.com.np" }, { name: "Jiban Chaudhary" }],
  creator: "JSD Group",
  publisher: "JSD Group",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jsdgroup.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JSD Group — Building Intelligent Solutions for a Digital Future",
    description: "Practical AI, data analysis, modern software engineering and digital transformation solutions in Nepal.",
    url: "https://jsdgroup.com",
    siteName: "JSD Group",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "JSD Group - Technology and AI Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSD Group — Building Intelligent Solutions for a Digital Future",
    description: "Practical AI, data analysis, and software engineering in Nepal.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  verification: {
    google: 'googleaa98e125c9971d90',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://jsdgroup.com/#website",
        "url": "https://jsdgroup.com",
        "name": "JSD Group",
        "description": "Building Intelligent Solutions for a Digital Future",
        "publisher": {
          "@id": "https://jsdgroup.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://jsdgroup.com/#organization",
        "name": "JSD Group",
        "url": "https://jsdgroup.com",
        "logo": "https://jsdgroup.com/logo.svg",
        "founder": {
          "@type": "Person",
          "name": "Jiban Chaudhary",
          "jobTitle": "Founder & Technology Lead"
        },
        "sameAs": [
          "https://github.com/RajbanshiJiban17",
          "https://linkedin.com/in/jiban-chaudhary-732698384",
          "https://JibanChaudhary1.com.np"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://jsdgroup.com/#localbusiness",
        "name": "JSD Group",
        "telephone": "+977-9868837762",
        "email": "jibanchy233@gmail.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nepalgunj-10, Adarshnagar",
          "addressLocality": "Nepalgunj",
          "addressRegion": "Banke",
          "addressCountry": "NP"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <ThemeProvider>
          <Suspense fallback={<div className="h-16" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <Suspense fallback={null}>
            <JeesaAIChat />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
