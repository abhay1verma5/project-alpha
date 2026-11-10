import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Goa Government Jobs 2026-27 — गोवा सरकारी नौकरी | SarkariAlert',
  description:
    'Goa Government Jobs 2026-27: Latest Goa sarkari naukri for GPSC, Goa Police, DIET, Goa Shipyard & more. Apply online for Goa state government vacancies.',
  keywords: [
    'goa government jobs 2026', 'goa sarkari naukri', 'gpsc vacancy 2026', 'goa police bharti',
    'goa shipyard recruitment', 'goa university jobs', 'goa panchayat jobs', 'goa health department vacancy',
  ],
  alternates: { canonical: 'https://sarkarialert.online/goa-government-jobs' },
  openGraph: {
    title: 'Goa Government Jobs 2026-27 — गोवा सरकारी नौकरी',
    description: 'Find Goa sarkari naukri 2026-27. GPSC, Goa Police, Goa Shipyard & more.',
    url: 'https://sarkarialert.online/goa-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Goa?', answer: 'GPSC (Goa Public Service Commission) for Group A/B posts, Goa Staff Selection Commission for Group C/D, Goa Police for constable/SI, Goa Shipyard Limited (Defence PSU), DIET Goa for teacher recruitment, and various departments for direct recruitment.' },
  { question: 'GPSC exam ka pattern kya hai?', answer: 'GPSC GCS (Goa Civil Services) mein Prelims (objective), Mains (descriptive), aur Interview hota hai. Posts: Deputy Collector, Deputy SP, Mamlatdar, BDO. Goa mein competition kam hota hai compared to larger states.' },
  { question: 'Goa government jobs ke liye age limit kya hai?', answer: 'GPSC GCS: 18-35 years (Gen), +5 OBC, +5 SC/ST. Goa Police Constable: 18-30 years. Most Goa govt posts have 30-35 years upper limit with relaxation. Goa domicile preferred for many posts.' },
  { question: 'Goa Shipyard Limited mein kaise apply karein?', answer: 'Goa Shipyard Limited (GSL) is a Miniratna Category I Defence PSU. Posts: Management Trainee, JE, Supervisor, various trades. Apply through goashipyard.in. GSL recruits through GATE score for engineering posts and written exam for others.' },
  { question: 'Goa mein upcoming government exams 2026 mein kaunse hain?', answer: 'GPSC GCS Prelims/Mains, Goa Police Constable & SI bharti, DIET teacher recruitment, Goa Shipyard apprentice/MT recruitment, Goa Panchayat Raj vacancies, Health Department (CHO, ANM, Staff Nurse), and Tourism Department posts.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Goa Government Jobs', item: 'https://sarkarialert.online/goa-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'goa', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'goa' }} />;
}

export default function GoaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Goa Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">गोवा सरकारी नौकरी 2026 — GPSC, Goa Police, Goa Shipyard भर्ती</p>
          </div>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Goa sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>GPSC</strong> (Goa Civil Services), <strong>Goa Police</strong>,{' '}
            <strong>Goa Shipyard Limited</strong> (Defence PSU), <strong>DIET</strong> (Teacher Recruitment),
            and other departments. Goa has relatively lower competition compared to larger states,
            making it a strategic option for government job aspirants.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Goa Government Jobs</h2>
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
