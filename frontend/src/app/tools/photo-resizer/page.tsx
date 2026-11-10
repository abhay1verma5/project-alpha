import type { Metadata } from 'next';
import { PhotoResizer } from '@/components/tools/PhotoResizer';

export const metadata: Metadata = {
  title: 'Photo & Signature Resizer — SarkariAlert',
  description: 'Free online photo and signature resizer for government job forms. Resize to exact KB and pixel dimensions for SSC, UPSC, Railway, Bank exams. 100% private — processed on your device.',
};

export default function PhotoResizerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          📷 Photo & Signature Resizer
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Resize photos and signatures for government exam forms. 100% free, works offline, never uploaded to any server.
        </p>
      </div>
      <PhotoResizer />
    </div>
  );
}
