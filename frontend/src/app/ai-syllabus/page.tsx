import type { Metadata } from 'next';
import { AISyllabusClient } from './AISyllabusClient';

export const metadata: Metadata = {
  title: 'AI Syllabus Analyzer — Exam Syllabus Breakdown',
  description: 'Get AI-powered syllabus breakdown for SSC, UPSC, IBPS, RRB, CTET, NDA exams with topic weightage and preparation tips.',
};

export default function AISyllabusPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AISyllabusClient />
    </div>
  );
}
