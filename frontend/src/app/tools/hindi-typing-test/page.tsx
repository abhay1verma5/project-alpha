import type { Metadata } from 'next';
import { HindiTypingTest } from '@/components/tools/HindiTypingTest';

export const metadata: Metadata = {
  title: 'Hindi Typing Test — हिंदी टाइपिंग टेस्ट for SSC, CPCT, Court | SarkariAlert',
  description: 'Free online Hindi typing test for SSC, CPCT, Court exams. Check your WPM speed and accuracy. Practice with Unicode Hindi paragraphs. 5/10/15 minute tests.',
  keywords: ['hindi typing test', 'हिंदी टाइपिंग टेस्ट', 'cpct typing test', 'ssc typing test', 'court typing test', 'hindi typing speed test online', 'mangal font typing', 'kruti dev typing'],
  alternates: { canonical: 'https://sarkarialert.online/tools/hindi-typing-test' },
};

export default function HindiTypingTestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Hindi Typing Test — हिंदी टाइपिंग टेस्ट
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          SSC, CPCT, Court और अन्य सरकारी परीक्षाओं के लिए हिंदी टाइपिंग अभ्यास करें। अपनी WPM speed और accuracy जाँचें।
        </p>
      </div>
      <HindiTypingTest />
    </div>
  );
}
