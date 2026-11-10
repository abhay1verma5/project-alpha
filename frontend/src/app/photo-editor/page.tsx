import type { Metadata } from 'next';
import { PhotoEditorClient } from './PhotoEditorClient';

export const metadata: Metadata = {
  title: 'Admit Card Photo Editor — Crop, Resize & Format Passport Photos',
  description: 'Free admit card photo editor for government exams. Crop, resize, adjust brightness/contrast for passport size photos. SSC, UPSC, Railway, Banking exam photo requirements.',
  keywords: ['admit card photo editor', 'passport photo editor', 'ssc photo resize', 'upsc photo format', 'exam photo crop'],
};

export default function PhotoEditorPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Admit Card Photo Editor
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Crop, resize and adjust your photo for government exam applications. Supports all common formats.
      </p>
      <PhotoEditorClient />
    </main>
  );
}
