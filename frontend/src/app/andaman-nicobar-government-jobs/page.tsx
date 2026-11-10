import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Andaman & Nicobar Government Jobs 2026-27 — अंडमान निकोबार सरकारी नौकरी | SarkariAlert',
  description:
    'Andaman & Nicobar Government Jobs 2026-27: Latest A&N Islands UT sarkari naukri for Administration, Police, Navy, Coast Guard & more. Apply online for island government vacancies.',
  keywords: [
    'andaman nicobar government jobs 2026', 'andaman sarkari naukri', 'andaman police bharti',
    'andaman nicobar administration vacancy', 'port blair government jobs', 'andaman teacher recruitment',
  ],
  alternates: { canonical: 'https://sarkarialert.online/andaman-nicobar-government-jobs' },
  openGraph: {
    title: 'Andaman & Nicobar Government Jobs 2026-27 — अंडमान निकोबार सरकारी नौकरी',
    description: 'Find A&N Islands sarkari naukri 2026-27. Administration, Police, Navy & more.',
    url: 'https://sarkarialert.online/andaman-nicobar-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Andaman & Nicobar Islands?', answer: 'A&N Administration is the primary recruiter for all UT posts (Clerk, LDC, Teacher, Police). Indian Navy and Coast Guard recruit for naval base posts in Port Blair. SSC for central government posts. DRDO for defence research positions. Directorate of Education for teacher posts. Health Department for medical staff (ANM, GNM, Pharmacist).' },
  { question: 'Andaman Nicobar mein government jobs ke liye kaise apply karein?', answer: 'A&N Administration (andaman.gov.in) for UT posts. SSC for central government posts. Indian Navy website for naval posts. Most applications are online. Local domicile certificate from DC office needed for reserved posts. Regular recruitment for Police, Education, Health departments.' },
  { question: 'Andaman Nicobar mein government jobs ke liye age limit kya hai?', answer: 'A&N UT posts: 18-33 years (General), +3 OBC, +5 SC/ST. Police Constable: 18-25 years. As a UT, central government relaxation rules apply. ST reservation for Nicobarese, Great Andamanese, Onge, Jarawa, Sentinelese tribal groups.' },
  { question: 'Andaman mein kaun se government departments hain?', answer: 'A&N Administration (Revenue, PWD, Electricity), A&N Police, Port Management Board, Directorate of Education, Directorate of Health Services, Directorate of Shipping Services, Forest Department (National Parks), Tourism Department, Fisheries Department, and PBMC (Port Blair Municipal Council).' },
  { question: 'Andaman Nicobar mein upcoming government exams kaunse hain?', answer: 'A&N Police (Constable/SI), A&N Administration (Clerk, JE, Teacher), Indian Navy (Port Blair base), Coast Guard (various), DRDO (NIOT positions), Health Department (ANM/GNM/Staff Nurse), Forest Department (Forest Guard/Range Officer), and Shipping Services (various marine posts).' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Andaman & Nicobar Government Jobs', item: 'https://sarkarialert.online/andaman-nicobar-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'andaman-nicobar', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'andaman-nicobar' }} />;
}

export default function AndamanNicobarGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Andaman & Nicobar Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">अंडमान निकोबार सरकारी नौकरी 2026 — Administration, Police, Navy भर्ती</p>
          </div>
        </div>
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Andaman & Nicobar Islands sarkari naukri 2026</strong> across all government departments.
            Browse vacancies from <strong>A&N Administration</strong>, <strong>A&N Police</strong>,{' '}
            <strong>Indian Navy (Port Blair)</strong>, <strong>Coast Guard</strong>, and other central departments.
            Island postings come with special island allowances and hardship pay.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Andaman & Nicobar Government Jobs</h2>
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
