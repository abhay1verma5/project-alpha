import type { Metadata } from 'next';
import { AIVocabularyClient } from './AIVocabularyClient';

export const metadata: Metadata = {
  title: 'AI Vocabulary Builder — English Words for Exams',
  description: 'Build your English vocabulary with AI. Get meanings, synonyms, usage examples, and Hindi translations for exam preparation.',
};

export default function AIVocabularyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIVocabularyClient />
    </div>
  );
}
