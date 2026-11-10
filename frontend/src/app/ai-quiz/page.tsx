import type { Metadata } from 'next';
import { QuizClient } from '@/components/ai-quiz/QuizClient';

export const metadata: Metadata = {
  title: 'AI Quiz Generator — Class 1-12, SSC, UPSC, Railway | SarkariAlert',
  description: 'AI-powered quiz generator for school (Class 1-12 NCERT) and government exam preparation. Practice MCQs with chapter-wise questions in Hindi & English.',
  keywords: 'AI quiz, class 12 quiz, NCERT quiz, physics quiz, chemistry quiz, ssc cgl quiz, upsc quiz, hindi quiz, cbse quiz',
};

export default function AiQuizPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <QuizClient />
    </div>
  );
}
