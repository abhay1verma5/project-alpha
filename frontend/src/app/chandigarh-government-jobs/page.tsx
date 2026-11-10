import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chandigarh Government Jobs 2026-27 — चंडीगढ़ सरकारी नौकरी | SarkariAlert',
  description:
    'Chandigarh Government Jobs 2026-27: Latest Chandigarh sarkari naukri for Chandigarh Administration, PGI, PU, Punjab & Haryana HC & more. Apply online for Chandigarh UT government vacancies.',
  keywords: [
    'chandigarh government jobs 2026', 'chandigarh sarkari naukri', 'chandigarh administration vacancy',
    'pgi chandigarh recruitment', 'punjab university chandigarh jobs', 'chandigarh police bharti',
  ],
  alternates: { canonical: 'https://sarkarialert.online/chandigarh-government-jobs' },
  openGraph: {
    title: 'Chandigarh Government Jobs 2026-27 — चंडीगढ़ सरकारी नौकरी',
    description: 'Find Chandigarh sarkari naukri 2026-27. Chandigarh Admin, PGI, PU & more.',
    url: 'https://sarkarialert.online/chandigarh-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major employers in Chandigarh?', answer: 'Chandigarh Administration for UT posts (Clerk, JE, Patwari). PGIMER Chandigarh for medical/nursing/admin posts. Panjab University for teaching and non-teaching staff. Chandigarh Police for constable, SI. Punjab & Haryana High Court for staff. Chandigarh Housing Board and Municipal Corporation.' },
  { question: 'Chandigarh Police mein kaise apply karein?', answer: 'Chandigarh Police bharti Chandigarh Administration ke through hoti hai. Written Test (objective) + Physical Measurement Test + Physical Endurance Test + Document Verification. Apply: chandigarhpolice.gov.in. Both male and female constable posts regularly advertised.' },
  { question: 'PGI Chandigarh mein kaunse jobs aate hain?', answer: 'PGIMER (Post Graduate Institute of Medical Education and Research) Chandigarh: Faculty (Professor, Associate Prof), Senior/Junior Resident, Staff Nurse, Lab Technician, OT Technician, Admin staff. PGIMER conducts its own recruitment exam. One of the best medical institutions in India.' },
  { question: 'Chandigarh mein government jobs ke liye age limit kya hai?', answer: 'Chandigarh Administration posts: 18-37 years (General), +3 OBC, +5 SC. Chandigarh Police: 18-25 years. PGIMER: varies by post. As a Union Territory, central government rules apply. Chandigarh residents get preference for UT posts.' },
  { question: 'Chandigarh mein upcoming government exams kaunse hain?', answer: 'Chandigarh Administration (Clerk, JE, TGT/PGT), Chandigarh Police (Constable/SI), PGIMER (Nursing, Lab Tech, Faculty), Panjab University (Professor, Clerk), Punjab & Haryana HC (Clerk, Stenographer), Municipal Corporation (JE, Sanitary Inspector), and Chandigarh Transport Undertaking.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Chandigarh Government Jobs', item: 'https://sarkarialert.online/chandigarh-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'chandigarh', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'chandigarh' }} />;
}

export default function ChandigarhGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Chandigarh Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">चंडीगढ़ सरकारी नौकरी 2026 — Chandigarh Admin, PGI, Chandigarh Police भर्ती</p>
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Chandigarh sarkari naukri 2026</strong> across all UT government departments.
            Browse vacancies from <strong>Chandigarh Administration</strong>, <strong>PGIMER</strong>,{' '}
            <strong>Panjab University</strong>, <strong>Chandigarh Police</strong>, and Punjab & Haryana High Court.
            Being a Union Territory with high HDI, Chandigarh offers excellent working conditions and central pay scales.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Chandigarh Government Jobs</h2>
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
