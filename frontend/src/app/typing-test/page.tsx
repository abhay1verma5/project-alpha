import type { Metadata } from 'next';
import { TypingTestClient } from './TypingTestClient';

export const metadata: Metadata = {
  title: 'Typing Test — Practice for SSC/Banking Typing Exams',
  description: 'Free typing speed test for SSC CHSL, SSC CGL, IBPS, and other government exam typing tests. Practice in English and Hindi.',
};

export default function TypingTestPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <TypingTestClient />
    </div>
  );
}
