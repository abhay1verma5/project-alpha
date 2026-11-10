import type { Metadata } from 'next';
import { AnswerKeyCalculator } from '@/components/tools/AnswerKeyCalculator';

export const metadata: Metadata = {
  title: 'Answer Key Calculator — Calculate Marks with Negative Marking | SarkariAlert',
  description: 'Calculate your exam score with negative marking. Presets for SSC CGL, UPSC Prelims, SSC GD, Railway NTPC, IBPS PO. See total score, percentage, and marks lost.',
  keywords: ['answer key calculator', 'negative marking calculator', 'ssc cgl marks calculator', 'upsc prelims score', 'exam score calculator', 'marks calculator with negative marking'],
  alternates: { canonical: 'https://sarkarialert.online/tools/answer-key-calculator' },
};

export default function AnswerKeyCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Answer Key Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          आंसर की कैलकुलेटर — निगेटिव मार्किंग के साथ स्कोर निकालें — Calculate your exam marks with negative marking for SSC, UPSC, Railway, and Bank exams.
        </p>
      </div>
      <AnswerKeyCalculator />
    </div>
  );
}
