'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, UserCheck, CheckCircle2, Clock, BarChart } from 'lucide-react';
import { Course } from '@/lib/types';
import EnrollmentModal from '@/components/EnrollmentModal';

export default function CoursesListClient({ courses }: { courses: Course[] }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {course.duration}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {course.level}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {course.title}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {course.summary}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="font-semibold text-white">{course.instructor}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Upcoming Batch:</span>
                  <span className="font-semibold text-cyan-400">{course.batch}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Tuition / Fee:</span>
                  <span className="font-semibold text-slate-200">{course.price}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2.5">
              <button
                onClick={() => handleEnroll(course)}
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
              >
                Enroll in Cohort
              </button>

              <Link
                href={`/courses/${course.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <EnrollmentModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
