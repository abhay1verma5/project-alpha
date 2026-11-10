import type { Metadata } from 'next';
import { FormAssistantClient } from './FormAssistantClient';

export const metadata: Metadata = {
  title: 'Form Fill Assistant — Government Job Application Helper',
  description:
    'Prepare all your details for filling government job application forms. Save personal info, education details, photo & signature locally. Copy formatted data with one click.',
  keywords: [
    'form fill assistant', 'sarkari form helper', 'government job application form',
    'SSC form fill', 'UPSC application helper', 'railway form details',
    'exam form auto fill', 'application form data saver',
  ],
  alternates: { canonical: 'https://sarkarialert.online/form-assistant' },
  openGraph: {
    title: 'Form Fill Assistant — Application Helper | SarkariAlert',
    description: 'Save your details and fill government job application forms faster. All data stays on your device.',
    url: 'https://sarkarialert.online/form-assistant',
  },
};

export default function FormAssistantPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0f2b44] py-8 sm:py-12">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Form Fill Assistant
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Save your details once, use them every time you fill a government job application form.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormAssistantClient />
      </div>
    </div>
  );
}
