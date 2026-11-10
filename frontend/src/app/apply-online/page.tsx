import type { Metadata } from 'next';
import { getJobs } from '@/lib/api';
import type { Job } from '@/lib/api';
import Link from 'next/link';
import { ExternalLink, FileEdit, Calendar, GraduationCap, Wallet, Building2, Clock, AlertTriangle } from 'lucide-react';
import { CATEGORY_LABELS, CATEGORY_COLORS, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Apply Online 2026-27 — Sarkari Naukri Application Forms Open Now',
  description:
    'Apply online for latest government jobs 2026-27. Direct links to official application forms — SSC, UPSC, Railway, Banking, Defence, Police, State PSC. Check last date, fee, eligibility & apply before deadline.',
  keywords: [
    'apply online', 'sarkari naukri apply', 'government job application form',
    'online form 2026', 'online form 2027', 'ssc apply online', 'upsc apply online', 'railway apply online',
    'sarkari form', 'application form last date', 'apply online sarkari result',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/apply-online',
  },
  openGraph: {
    title: 'Apply Online 2026-27 — Sarkari Naukri Application Forms Open Now',
    description:
      'Direct links to government job application forms. Check eligibility, fee, last date and apply before the deadline.',
    url: 'https://sarkarialert.online/apply-online',
    type: 'website',
  },
};

/** Compact fee summary: "Gen ₹500 | OBC ₹250 | SC/ST Free" */
function formatFee(fee: Record<string, string> | null | undefined): string | null {
  if (!fee || Object.keys(fee).length === 0) return null;
  return Object.entries(fee)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' | ');
}

/** Color class for the deadline based on days remaining */
function deadlineColor(daysLeft: number | null): string {
  if (daysLeft === null) return 'text-gray-600 dark:text-gray-400';
  if (daysLeft <= 3) return 'text-red-600 dark:text-red-400 font-extrabold';
  if (daysLeft <= 7) return 'text-amber-600 dark:text-amber-400 font-bold';
  return 'text-gray-800 dark:text-gray-200';
}

/** Background highlight for rows with urgent deadlines */
function rowUrgencyClass(daysLeft: number | null): string {
  if (daysLeft === null) return '';
  if (daysLeft <= 3) return 'bg-red-50/60 dark:bg-red-950/20 border-l-4 border-l-red-500';
  if (daysLeft <= 7) return 'bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-l-amber-500';
  return '';
}

function ApplyCard({ job }: { job: Job }) {
  const categoryLabel = CATEGORY_LABELS[job.category] || job.category;
  const categoryColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other;
  const feeStr = formatFee(job.fee);

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 transition-colors hover:border-blue-400 dark:hover:border-blue-500 ${rowUrgencyClass(job.days_left)}`}
    >
      {/* Top row: category + urgency */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${categoryColor}`}>
          {categoryLabel}
        </span>
        {job.days_left !== null && job.days_left <= 3 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-lg animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            {job.days_left === 0 ? 'Last Day!' : `${job.days_left} Days Left!`}
          </span>
        )}
      </div>

      {/* Title — bilingual */}
      <Link href={`/jobs/${job.slug}`} className="group">
        <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {job.title}
        </h2>
        {job.title_hi && job.title_hi !== job.title && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {job.title_hi}
          </p>
        )}
      </Link>

      {/* Organization */}
      {job.organization && (
        <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1.5">
          <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {job.organization}
        </p>
      )}

      {/* Key details grid */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {/* Last Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">Last Date</span>
            <span className={deadlineColor(job.days_left)}>
              {formatDate(job.last_date)}
            </span>
          </div>
        </div>

        {/* Days Left */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">Time Left</span>
            <span className={`font-semibold ${deadlineColor(job.days_left)}`}>
              {job.days_left !== null
                ? job.days_left === 0
                  ? 'Closes Today'
                  : `${job.days_left} day${job.days_left > 1 ? 's' : ''}`
                : 'N/A'}
            </span>
          </div>
        </div>

        {/* Qualification */}
        {job.qualification && (
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <GraduationCap className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">Qualification</span>
              <span className="font-semibold text-purple-800 dark:text-purple-200 truncate block max-w-[200px]">
                {job.qualification}
              </span>
            </div>
          </div>
        )}

        {/* Fee */}
        {feeStr && (
          <div className="flex items-start gap-1.5 col-span-2">
            <Wallet className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">Application Fee</span>
              <span className="font-semibold text-rose-700 dark:text-rose-300 text-xs">
                {feeStr}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Apply Now button */}
      <div className="mt-4 flex items-center gap-2">
        <a
          href={job.apply_link!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors active:scale-[0.97] shadow-md shadow-green-600/20"
        >
          <ExternalLink className="w-4 h-4" />
          Apply Now
        </a>
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

const applyFaqData = [
  {
    question: 'How to apply online for sarkari naukri?',
    answer: 'Step 1: Find the job on SarkariAlert. Step 2: Click "Apply Now" to go to the official website. Step 3: Register with your details (name, email, phone). Step 4: Fill the application form. Step 5: Upload photo, signature, and documents. Step 6: Pay the application fee. Step 7: Submit and save the confirmation.',
  },
  {
    question: 'Online form bharne ke liye kya chahiye?',
    answer: 'Online form ke liye chahiye: 1) Aadhaar card number, 2) Email ID aur mobile number, 3) Passport size photo (10-50 KB, JPG), 4) Signature scan (10-20 KB, JPG), 5) Educational certificates, 6) Category certificate (agar applicable), 7) Debit card/UPI for fee payment.',
  },
  {
    question: 'What is the application fee for government jobs?',
    answer: 'SSC exams: Rs 100 (SC/ST/Female/PwD: Free). UPSC: Rs 100 (Female/SC/ST: Free). Banking: Rs 450-850 (SC/ST/PwD: Rs 50-100). Railway: Rs 250-500 (SC/ST/Female/PwD: Free). Most exams offer fee exemption for SC/ST/PwD/Ex-Servicemen candidates.',
  },
  {
    question: 'Can I edit my application after submission?',
    answer: 'Most government job applications allow a correction window of 3-7 days after the last date. SSC provides a correction window for limited fields. UPSC allows one correction. Banking exams usually don\'t allow corrections. Always double-check before final submission.',
  },
  {
    question: 'What photo and signature specifications are required?',
    answer: 'Typical requirements: Photo — 3.5x4.5 cm, 10-50 KB, JPG format, white background, recent passport style. Signature — 3.5x1.5 cm, 10-20 KB, JPG format, black ink on white paper. Some exams also require left thumb impression. Always check the specific notification for exact specifications.',
  },
  {
    question: 'How to pay application fee online?',
    answer: 'Most government job portals accept: Debit Card, Credit Card, Net Banking, UPI, and Challan (SBI/other banks). UPI is the fastest and easiest method. For challan, you need to visit the bank branch within the given time. Keep the payment receipt safe for future reference.',
  },
  {
    question: 'Last date ke baad apply kar sakte hain kya?',
    answer: 'Nahi, last date ke baad apply nahi kar sakte. Government exams strictly follow deadlines. Last date ke baad link band ho jata hai. Isliye jaldi apply karein — last minute mein server slow hone se problem ho sakti hai. SarkariAlert par deadline filter use karein taaki koi form miss na ho.',
  },
  {
    question: 'What if the application website is not working?',
    answer: 'Try these: 1) Use a different browser (Chrome recommended). 2) Clear cache and cookies. 3) Try during non-peak hours (early morning/late night). 4) Check if the server is under maintenance. 5) Use a desktop instead of mobile. 6) If near deadline, take screenshots of errors as proof.',
  },
];

export default async function ApplyOnlinePage() {
  // Fetch jobs sorted by nearest deadline first, with large page size to get all open forms
  let allJobs: Job[] = [];
  let fetchError = false;

  try {
    const data = await getJobs({ ordering: 'last_date', page_size: '100' });
    allJobs = data.results;
  } catch {
    fetchError = true;
  }

  // Filter: only non-expired jobs that have an apply_link
  const openForms = allJobs.filter(
    (job) => job.is_expired === false && job.apply_link
  );

  // Count urgent forms (deadline within 3 days)
  const urgentCount = openForms.filter(
    (job) => job.days_left !== null && job.days_left <= 3
  ).length;

  if (fetchError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <FileEdit className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Apply Online</h1>
        </div>
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <FileEdit className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load application forms</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <FileEdit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Apply Online</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {openForms.length} application form{openForms.length !== 1 ? 's' : ''} open
              {urgentCount > 0 && (
                <span className="text-red-600 dark:text-red-400 font-semibold ml-1">
                  ({urgentCount} closing soon)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="mb-6 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 text-sm text-blue-800 dark:text-blue-300">
        <strong>Sorted by deadline</strong> &mdash; forms closing soonest appear first. Red highlighted forms are closing within 3 days. Click &quot;Apply Now&quot; to go directly to the official application page.
      </div>

      {/* Stats summary */}
      {openForms.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
            <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{openForms.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Forms Open</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {openForms.filter((j) => j.days_left !== null && j.days_left <= 7).length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Closing This Week</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
            <p className="text-2xl font-extrabold text-red-600 dark:text-red-400">{urgentCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Urgent (&le;3 days)</p>
          </div>
        </div>
      )}

      {/* Job cards */}
      {openForms.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <FileEdit className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">No open application forms right now</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Check back soon or browse <Link href="/jobs" className="text-blue-600 dark:text-blue-400 underline">all jobs</Link> for upcoming notifications.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {openForms.map((job) => (
            <ApplyCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Apply Online
        </h2>
        <div className="space-y-4">
          {applyFaqData.map((faq, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {faq.question}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: applyFaqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Apply Online — Sarkari Naukri Application Forms 2026-27',
            description:
              'List of all currently open government job application forms with direct links, sorted by deadline.',
            url: 'https://sarkarialert.online/apply-online',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: openForms.length,
              itemListElement: openForms.slice(0, 20).map((job, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'JobPosting',
                  title: job.title,
                  hiringOrganization: {
                    '@type': 'Organization',
                    name: job.organization || 'Government of India',
                  },
                  datePosted: job.posted_date,
                  validThrough: job.last_date || undefined,
                  url: `https://sarkarialert.online/jobs/${job.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
