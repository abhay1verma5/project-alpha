import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Puducherry Government Jobs 2026-27 — पुडुचेरी सरकारी नौकरी | SarkariAlert',
  description:
    'Puducherry Government Jobs 2026-27: Latest Puducherry sarkari naukri for Puducherry Administration, JIPMER, Puducherry Police & more. Apply online for Puducherry UT vacancies.',
  keywords: [
    'puducherry government jobs 2026', 'puducherry sarkari naukri', 'pondicherry government jobs',
    'jipmer puducherry recruitment', 'puducherry police bharti', 'puducherry teacher vacancy',
  ],
  alternates: { canonical: 'https://sarkarialert.online/puducherry-government-jobs' },
  openGraph: {
    title: 'Puducherry Government Jobs 2026-27 — புதுச்சேரி அரசு வேலைகள்',
    description: 'Find Puducherry sarkari naukri 2026-27. JIPMER, Puducherry Admin & more.',
    url: 'https://sarkarialert.online/puducherry-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Puducherry?', answer: 'Puducherry UT Administration for all UT posts. JIPMER (Jawaharlal Institute of Postgraduate Medical Education & Research) for medical/nursing/admin posts. Puducherry Police for constable, SI. Pondicherry University for teaching/non-teaching. PPSC (Puducherry PSC) for Group A/B posts. Puducherry Cooperative Service for banking posts.' },
  { question: 'JIPMER Puducherry mein kaunse jobs aate hain?', answer: 'JIPMER Puducherry: Faculty (Professor, Associate Prof), Senior/Junior Resident, Staff Nurse, Lab Technician, Pharmacist, Admin staff (UDC, LDC, DEO). JIPMER is an Institute of National Importance. Own recruitment exam. Excellent pay and facilities.' },
  { question: 'Puducherry mein government jobs ke liye age limit kya hai?', answer: 'Puducherry UT posts: 18-30 years (General), +3 OBC, +5 SC/ST. Puducherry Police: 18-25 years. JIPMER: varies by post. As a UT with elected government, both central and state rules apply. Puducherry residents preferred.' },
  { question: 'Puducherry Police mein kaise apply karein?', answer: 'Puducherry Police recruitment: police.py.gov.in. Written exam + Physical Measurement + Physical Efficiency Test + Medical + Document Verification. Bilingual paper (English/Tamil/French for some areas). Puducherry domicile certificate required.' },
  { question: 'Puducherry mein upcoming government exams kaunse hain?', answer: 'Puducherry Administration (Clerk, JE, Teacher), Puducherry Police (Constable/SI), JIPMER (Nursing, Lab Tech, Faculty), Pondicherry University (Professor, Non-teaching), PPSC exams, and Health Department (PHC Medical Officer, CHO, ANM). Puducherry also has recruitment from Karaikal, Mahe, and Yanam regions.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Puducherry Government Jobs', item: 'https://sarkarialert.online/puducherry-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'puducherry', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'puducherry' }} />;
}

export default function PuducherryGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Puducherry Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">புதுச்சேரி அரசு வேலைகள் 2026 — JIPMER, Puducherry Police வேலைவாய்ப்பு</p>
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Puducherry sarkari naukri 2026</strong> across all UT departments.
            Browse vacancies from <strong>Puducherry Administration</strong>, <strong>JIPMER</strong> (Medical Institute of National Importance),{' '}
            <strong>Puducherry Police</strong>, <strong>Pondicherry University</strong>, and district offices
            including Karaikal, Mahe, and Yanam regions.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Puducherry Government Jobs</h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">{faq.question}<span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span></summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
