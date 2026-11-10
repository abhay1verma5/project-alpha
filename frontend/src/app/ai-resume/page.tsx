import type { Metadata } from 'next';
import { AIResumeClient } from './AIResumeClient';

export const metadata: Metadata = {
  title: 'AI Resume Builder — Government Job Optimized Resume',
  description: 'Generate a professional government job-optimized resume using AI. Free tool for SSC, UPSC, Railway, Banking aspirants.',
};

export default function AIResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIResumeClient />
    </div>
  );
}
