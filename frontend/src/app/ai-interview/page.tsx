import type { Metadata } from 'next';
import { AIInterviewClient } from './AIInterviewClient';

export const metadata: Metadata = {
  title: 'AI Interview Prep — Mock Interview Questions',
  description: 'Practice government job interview questions with AI. Get personalized mock interview prep for SSC, UPSC, Banking, Railway, Defence.',
  keywords: ['mock interview', 'government job interview', 'ssc interview questions', 'upsc interview prep', 'AI mock interview', 'sarkari naukri interview', 'interview practice online'],
  alternates: { canonical: 'https://sarkarialert.online/ai-interview' },
};

export default function AIInterviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIInterviewClient />
    </div>
  );
}
