import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { MapPin, Building2, ArrowRight, ChevronRight } from 'lucide-react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { getDistrict, getAllDistrictParams } from '@/lib/districts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllDistrictParams();
}

export async function generateMetadata(
  { params }: { params: Promise<{ state: string; district: string }> }
): Promise<Metadata> {
  const { state, district } = await params;
  const info = getDistrict(state, district);
  if (!info) return { title: 'Not Found' };

  const title = `Government Jobs in ${info.district.name}, ${info.state.name} 2026 — ${info.district.nameHi} सरकारी नौकरी`;
  const description = `Latest government jobs in ${info.district.name}, ${info.state.name}. Find sarkari naukri vacancies from ${info.state.recruitmentBodies.join(', ')} near ${info.district.name}. Apply online with eligibility, salary & last date.`;

  return {
    title,
    description,
    keywords: [
      `government jobs in ${info.district.name.toLowerCase()}`,
      `sarkari naukri ${info.district.name.toLowerCase()}`,
      `${info.district.name.toLowerCase()} govt jobs 2026`,
      `${info.state.name.toLowerCase()} government jobs`,
      ...info.state.recruitmentBodies.map(b => `${b} vacancy ${info.district.name.toLowerCase()}`),
    ],
    alternates: {
      canonical: `https://sarkarialert.online/government-jobs/${state}/${district}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sarkarialert.online/government-jobs/${state}/${district}`,
      type: 'website',
    },
  };
}

async function DistrictJobs({ state, stateName }: { state: string; stateName: string }) {
  const stateKey = state.replace(/-/g, '_');
  const data = await getJobs({ state: stateKey, page: '1' });
  if (!data?.results?.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium">No jobs currently listed for this location.</p>
        <p className="mt-2 text-sm">Check back soon — new jobs are added every hour.</p>
        <Link href={`/${state}-government-jobs`} className="mt-4 inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
          View all {stateName} jobs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: stateKey }} />;
}

export default async function DistrictJobsPage(
  { params }: { params: Promise<{ state: string; district: string }> }
) {
  const { state, district } = await params;
  const info = getDistrict(state, district);
  if (!info) notFound();

  const faqData = [
    {
      question: `How to find government jobs in ${info.district.name}?`,
      answer: `Visit SarkariAlert and filter by ${info.state.name} state. Major recruitment bodies for ${info.district.name} area include ${info.state.recruitmentBodies.join(', ')}. Apply online through official portals when notifications are released.`,
    },
    {
      question: `${info.district.nameHi} में सरकारी नौकरी कैसे पाएं?`,
      answer: `${info.district.nameHi} में सरकारी नौकरी पाने के लिए ${info.state.recruitmentBodies.join(', ')} की वेबसाइट पर जाएं। SarkariAlert पर सभी ${info.state.nameHi} सरकारी नौकरियों की जानकारी मिलती है।`,
    },
    {
      question: `What is the salary for government jobs in ${info.district.name}?`,
      answer: `Government job salaries in ${info.district.name} follow 7th Pay Commission scales. Entry-level posts (Group C/D) start at ₹18,000-25,000. Group B posts range ₹35,000-60,000. Group A posts start at ₹56,000+. Additional DA, HRA, and TA are provided.`,
    },
    {
      question: `Which are the top government exams for ${info.district.name} residents?`,
      answer: `Top exams include: ${info.state.recruitmentBodies.join(', ')} state exams, SSC CGL/CHSL for central govt, IBPS for banking, Railway NTPC/Group D, UPSC for IAS/IPS, and local police recruitment.`,
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online' },
      { '@type': 'ListItem', position: 2, name: `${info.state.name} Jobs`, item: `https://sarkarialert.online/${state}-government-jobs` },
      { '@type': 'ListItem', position: 3, name: `${info.district.name} Jobs`, item: `https://sarkarialert.online/government-jobs/${state}/${district}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4 overflow-x-auto">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <Link href={`/${state}-government-jobs`} className="hover:text-blue-600">{info.state.name} Jobs</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">{info.district.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Government Jobs in {info.district.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {info.district.nameHi} सरकारी नौकरी — {info.state.nameHi}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          Find latest government job vacancies in {info.district.name}, {info.state.name}.
          Major recruitment bodies: {info.state.recruitmentBodies.join(', ')}.
          Updated every hour with new sarkari naukri notifications.
        </p>
      </div>

      {/* Recruitment Bodies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {info.state.recruitmentBodies.map(body => (
          <span key={body} className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
            <Building2 className="w-3 h-3 inline mr-1" />{body}
          </span>
        ))}
      </div>

      {/* Job Listings */}
      <Suspense fallback={<JobListSkeleton />}>
        <DistrictJobs state={state} stateName={info.state.name} />
      </Suspense>

      {/* Other Districts */}
      <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Other Districts in {info.state.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {info.state.districts
            .filter(d => d.slug !== district)
            .map(d => (
              <Link
                key={d.slug}
                href={`/government-jobs/${state}/${d.slug}`}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {d.name}
              </Link>
            ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <summary className="font-semibold text-sm text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 flex-shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
