import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JeesaAIChat from "@/components/JeesaAIChat";

export const metadata: Metadata = {
  title: "JSD Group | Building Intelligent Solutions for a Digital Future",
  description: "JSD Group is a technology company based in Nepalgunj, Banke, Nepal, specializing in practical AI Solutions, Machine Learning, Data Analytics, FastAPI and Next.js Enterprise Software Development.",
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
  authors: [{ name: "JSD Group", url: "https://JibanChaudhary1.com.np" }],
  creator: "JSD Group",
  publisher: "JSD Group",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "JSD Group — Building Intelligent Solutions for a Digital Future",
    description: "Practical AI, data analysis, modern software engineering and digital transformation solutions in Nepal.",
    url: "https://jsdgroup.com",
    siteName: "JSD Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSD Group — Building Intelligent Solutions for a Digital Future",
    description: "Practical AI, data analysis, and software engineering in Nepal.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
        "@type": "Organization",
        "@id": "https://jsdgroup.com/#organization",
        "name": "JSD Group",
        "url": "https://jsdgroup.com",
        "logo": "https://jsdgroup.com/logo.png",
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
        "telephone": "9868837762",
        "email": "jibanchy233@gmail.com",
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
