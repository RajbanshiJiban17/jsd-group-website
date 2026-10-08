'use client';

import React, { useState } from 'react';
import { Course } from '@/lib/types';
import EnrollmentModal from '@/components/EnrollmentModal';

export default function CourseDetailClient({ course }: { course: Course }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="text-xs text-slate-400">Current Cohort</p>
          <p className="text-sm font-bold text-white">{course.batch}</p>
          <p className="text-xs text-cyan-400">Lead Instructor: {course.instructor}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
        >
          Enroll in This Cohort
        </button>
      </div>

      <EnrollmentModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
