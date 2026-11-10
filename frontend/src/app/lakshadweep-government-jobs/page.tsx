import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lakshadweep Government Jobs 2026-27 — लक्षद्वीप सरकारी नौकरी | SarkariAlert',
  description:
    'Lakshadweep Government Jobs 2026-27: Latest Lakshadweep UT sarkari naukri for Administration, Police, Navy, Coast Guard & more. Apply online for island UT vacancies.',
  keywords: [
    'lakshadweep government jobs 2026', 'lakshadweep sarkari naukri', 'lakshadweep police bharti',
    'lakshadweep administration vacancy', 'kavaratti government jobs', 'lakshadweep teacher recruitment',
  ],
  alternates: { canonical: 'https://sarkarialert.online/lakshadweep-government-jobs' },
  openGraph: {
    title: 'Lakshadweep Government Jobs 2026-27 — लक्षद्वीप सरकारी नौकरी',
    description: 'Find Lakshadweep UT sarkari naukri 2026-27. Administration, Police, Navy & more.',
    url: 'https://sarkarialert.online/lakshadweep-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Lakshadweep?', answer: 'Lakshadweep UT Administration (Kavaratti) for all government posts. Indian Navy and Coast Guard for defence posts. SSC for central government posts. Directorate of Education for teachers. Health Department for medical staff (Doctor, ANM, GNM). Harbour Engineering Department for marine/port posts.' },
  { question: 'Lakshadweep mein government jobs ke liye kaise apply karein?', answer: 'Lakshadweep UT Administration (lakshadweep.gov.in) for UT posts. SSC for central posts. Applications mostly online. Local domicile/ST certificate from island administration needed for reserved posts. Special recruitment drives for island residents.' },
  { question: 'Lakshadweep mein government jobs ke liye age limit kya hai?', answer: 'UT posts: 18-33 years (General), +3 OBC, +5 SC/ST. Police: 18-25 years. Central government age relaxation rules apply. ST reservation for native islanders. Island allowance and hardship pay additional benefits.' },
  { question: 'Lakshadweep mein kaun se government departments hain?', answer: 'UT Administration (Revenue, PWD), Lakshadweep Police, Education Department, Health Department, Fisheries Department, Tourism & Sports, Harbour Engineering, Animal Husbandry, Cooperative Department, and SPORTS (Society for Promotion of Nature Tourism & Sports).' },
  { question: 'Lakshadweep mein upcoming government exams kaunse hain?', answer: 'Lakshadweep Police (Constable/SI), UT Administration (Clerk, JE, Peon), Education Department (Teacher/Lecturer), Health Department (Doctor/Nurse/Pharmacist), Harbour Department (Marine Engineer/Sailor), Fisheries (Inspector/Assistant), and Coast Guard (various island posts).' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Lakshadweep Government Jobs', item: 'https://sarkarialert.online/lakshadweep-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'lakshadweep', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'lakshadweep' }} />;
}

export default function LakshadweepGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Lakshadweep Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">लक्षद्वीप सरकारी नौकरी 2026 — Administration, Police, Navy भर्ती</p>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Lakshadweep UT sarkari naukri 2026</strong> across all government departments.
            Browse vacancies from <strong>Lakshadweep Administration</strong>, <strong>Lakshadweep Police</strong>,{' '}
            <strong>Indian Navy</strong>, <strong>Coast Guard</strong>, and other departments.
            India&apos;s smallest UT offers island allowances, free accommodation, and travel concessions.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Lakshadweep Government Jobs</h2>
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
