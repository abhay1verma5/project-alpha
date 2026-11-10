import type { Metadata } from 'next';
import { PdfCompressor } from '@/components/tools/PdfCompressor';

export const metadata: Metadata = {
  title: 'PDF & Image Compressor — सरकारी फॉर्म के लिए फाइल साइज कम करें | SarkariAlert',
  description: 'Check your PDF and image file sizes for government form requirements. SSC, UPSC, Railway photo and signature size checker. Free online tool.',
  keywords: ['pdf compressor', 'image compressor', 'sarkari form photo size', 'signature size reducer', 'ssc photo size', 'upsc photo requirements', 'government form file size', 'pdf size checker'],
  alternates: { canonical: 'https://sarkarialert.online/tools/pdf-compressor' },
};

export default function PdfCompressorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          PDF & Image Size Checker — फाइल साइज़ जाँचें
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          सरकारी फॉर्म भरने से पहले अपनी photo, signature और PDF की file size जाँचें। SSC, UPSC, Railway, Bank — सभी forms के लिए।
        </p>
      </div>
      <PdfCompressor />
    </div>
  );
}
