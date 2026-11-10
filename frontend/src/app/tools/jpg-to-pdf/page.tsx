import type { Metadata } from 'next';
import { JpgToPdf } from '@/components/tools/JpgToPdf';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter — SarkariAlert',
  description: 'Free online JPG to PDF converter for government job applications. Combine multiple images into one PDF. 100% private — processed on your device. No signup, works offline.',
  keywords: ['jpg to pdf', 'image to pdf converter', 'photo to pdf', 'sarkari form pdf', 'government job application pdf', 'free pdf converter online', 'combine images to pdf'],
  alternates: { canonical: 'https://sarkarialert.online/tools/jpg-to-pdf' },
};

export default function JpgToPdfPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          JPG to PDF Converter
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Combine multiple images into a single PDF for government job applications. 100% free, works offline, never uploaded to any server.
        </p>
      </div>
      <JpgToPdf />
    </div>
  );
}
