import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const company = await api.getCompanySettings();

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Contact <span className="gradient-text">JSD Group</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Whether you want to commission a custom AI solution, request a RetailIQ demo, or enroll in a cohort, our leadership team is ready to connect.
          </p>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white">Office Headquarters</h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                      Physical Location
                    </span>
                    <p className="font-medium text-white mt-0.5">{company.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                      Direct Telephone
                    </span>
                    <a href={`tel:${company.phone}`} className="font-medium text-white hover:text-cyan-400 mt-0.5 block">
                      {company.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                      Electronic Mail
                    </span>
                    <a href={`mailto:${company.email}`} className="font-medium text-white hover:text-cyan-400 mt-0.5 block">
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                      Operating Hours
                    </span>
                    <p className="text-white mt-0.5">Sunday – Friday: 9:00 AM – 6:00 PM NPT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nepalgunj Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 h-64 relative">
              <iframe
                title="JSD Group Office Location - Nepalgunj"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14092.427670987118!2d81.6111!3d28.0538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3998679f225e4c03%3A0x7d6f582f349c719e!2sNepalgunj%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
