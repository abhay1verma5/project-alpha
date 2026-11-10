import type { Metadata } from 'next';
import { FlashcardsClient } from './FlashcardsClient';

export const metadata: Metadata = {
  title: 'GK Flashcards — Study General Knowledge',
  description: 'Study general knowledge with swipeable flashcards. Perfect for SSC, UPSC, Railway, Banking exam preparation.',
};

export default function FlashcardsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <FlashcardsClient />
    </div>
  );
}
