import type { Metadata } from 'next';
import { AIDoubtClient } from './AIDoubtClient';

export const metadata: Metadata = {
  title: 'AI Doubt Solver — Get Your Study Doubts Cleared',
  description: 'Ask any GK, Science, History, Polity, Geography doubt and get clear AI explanations with examples.',
};

export default function AIDoubtPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIDoubtClient />
    </div>
  );
}
