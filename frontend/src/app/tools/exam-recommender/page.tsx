import type { Metadata } from 'next';
import { ExamRecommender } from '@/components/tools/ExamRecommender';

export const metadata: Metadata = {
  title: 'Which Government Exam Should I Take? — AI Quiz | SarkariAlert',
  description: 'Take this 5-minute AI quiz to find the best government exams for you. Based on your qualification, age, strengths & preferences — get personalized exam recommendations with match scores.',
  keywords: ['which government exam should I take', 'best sarkari exam for me', 'government exam recommender', 'exam finder quiz', 'ssc or upsc which is better', 'konsi sarkari naukri de', 'exam recommendation quiz', 'sarkari pariksha quiz'],
  alternates: { canonical: 'https://sarkarialert.online/tools/exam-recommender' },
};

export default function ExamRecommenderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Which Exam Should I Take? — AI Exam Recommender
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          5 मिनट का quiz लें और जानें कि आपके लिए कौन सी सरकारी परीक्षा सबसे बेहतर है। AI आपकी qualification, age, strengths और preferences के आधार पर top exams recommend करेगा।
        </p>
      </div>
      <ExamRecommender />
    </div>
  );
}
