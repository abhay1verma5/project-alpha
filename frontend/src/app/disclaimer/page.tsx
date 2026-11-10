import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for SarkariAlert — important information about data accuracy and usage.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Disclaimer</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: October 19, 2026</p>

      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-5">
          <h2 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">Important Notice</h2>
          <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
            SarkariAlert is <strong>NOT</strong> an official government website. We are an independent information aggregation platform. All information displayed on this website is sourced from publicly available official government websites. Users are strongly advised to verify all information from the respective official websites before taking any action.
          </p>
        </div>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Data Sources</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            All government job notifications, results, admit cards, answer keys, and related information are collected from official government websites including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>SSC (ssc.nic.in)</li>
            <li>UPSC (upsc.gov.in)</li>
            <li>Railway Recruitment Boards (rrbcdg.gov.in, etc.)</li>
            <li>IBPS (ibps.in)</li>
            <li>State Public Service Commissions</li>
            <li>Employment News (employmentnews.gov.in)</li>
            <li>National Career Service (ncs.gov.in)</li>
            <li>Various ministry and department websites</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">No Guarantee of Accuracy</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            While we make every effort to ensure the accuracy and timeliness of the information on SarkariAlert, we do not guarantee that all information is correct, complete, or current. Job details including vacancy numbers, eligibility criteria, age limits, application deadlines, fee structures, and exam dates may change without notice. Always refer to the official notification/advertisement for the most accurate information.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">AI-Generated Content</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            SarkariAlert uses artificial intelligence (AI) to power several features including quiz generation, career guidance, eligibility checking, and smart search. AI-generated content is provided for educational and informational purposes only. It should not be considered as professional, legal, or career advice. AI may occasionally produce inaccurate or incomplete information.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Limitation of Liability</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            SarkariAlert, its owners, operators, and contributors shall not be held liable for any loss, damage, or inconvenience caused by reliance on information provided on this website. This includes, but is not limited to, missed application deadlines, incorrect eligibility assessments, financial losses, or any other consequences arising from the use of this website.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">External Links</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            This website contains links to external websites (official government portals, application forms, etc.). We are not responsible for the content, privacy practices, or availability of these external websites.
          </p>
        </section>
      </div>
    </div>
  );
}
