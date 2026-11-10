import type { Metadata } from 'next';
import { PhotoSignature } from '@/components/tools/PhotoSignature';

export const metadata: Metadata = {
  title: 'Photo + Signature Combiner for Govt Exams — SarkariAlert',
  description: 'Combine passport photo and signature into one image at exact dimensions and KB limits for SSC, UPSC, Railway, Banking exams. 100% private — processed on your device.',
  keywords: ['photo signature combiner', 'passport photo resize', 'ssc photo signature', 'upsc photo upload', 'government exam photo size', 'signature resize online', 'sarkari form photo'],
  alternates: { canonical: 'https://sarkarialert.online/tools/photo-signature' },
};

export default function PhotoSignaturePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Photo + Signature Combiner
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Combine your passport photo and signature into one image at exact specs for government exam forms. 100% free, works offline, never uploaded to any server.
        </p>
      </div>
      <PhotoSignature />
    </div>
  );
}
