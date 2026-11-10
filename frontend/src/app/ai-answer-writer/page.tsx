import type { Metadata } from 'next';
import { AIAnswerWriterClient } from './AIAnswerWriterClient';

export const metadata: Metadata = {
  title: 'AI Answer Writer — Model Answers for UPSC/SSC',
  description: 'Get AI-generated model answers for essay and descriptive questions for UPSC, SSC, and other government exams.',
};

export default function AIAnswerWriterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIAnswerWriterClient />
    </div>
  );
}
