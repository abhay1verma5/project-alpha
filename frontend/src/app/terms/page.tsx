import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for SarkariAlert — India\'s government job portal.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: October 19, 2026</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            By accessing and using SarkariAlert (sarkarialert.online), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Description of Service</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            SarkariAlert is a free information aggregation platform that collects and displays government job notifications, exam results, admit cards, answer keys, and related information from official government websites. We also provide educational tools such as previous year question practice, mock tests, AI-powered quiz generation, and career guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Information Accuracy</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            While we strive to provide accurate and up-to-date information, SarkariAlert does not guarantee the completeness, reliability, or accuracy of any information on this website. All job notifications, dates, eligibility criteria, and other details should be verified from the official government websites before taking any action. We are not responsible for any errors, omissions, or outdated information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. User Conduct</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">You agree not to:</p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Scrape, crawl, or use automated tools to extract content without permission</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Impersonate any person or entity</li>
            <li>Use the AI tools to generate harmful, misleading, or inappropriate content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The SarkariAlert name, logo, website design, and original content are our intellectual property. Government job notifications and related data are sourced from publicly available government websites. Question banks include content from publicly available educational resources.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. AI-Generated Content</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Some features on SarkariAlert use artificial intelligence to generate content, including quiz questions, career guidance, and eligibility checks. AI-generated content is provided for educational purposes only and should not be considered as professional advice. Always verify important information from official sources.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Third-Party Links</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our website contains links to official government websites and other third-party sites. We are not responsible for the content, privacy practices, or policies of these external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            SarkariAlert shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, the service. This includes but is not limited to missed application deadlines, incorrect eligibility assessments, or any loss resulting from reliance on information provided on this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">9. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">10. Contact</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For questions about these Terms of Service, please contact us at <a href="mailto:abhaykumarverma910@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">abhaykumarverma910@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
