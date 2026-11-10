import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — SarkariAlert',
  description: 'Privacy policy for SarkariAlert. How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Last updated: 12 October 2026
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">1. Who We Are</h2>
          <p>
            SarkariAlert (<strong>sarkarialert.online</strong>) is a free government job information aggregator.
            We collect and display publicly available job notifications from official government websites
            (SSC, UPSC, Railway, Banking, State PSC, Defence, etc.) to help job aspirants find opportunities
            in one place.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">2. Data We Collect</h2>
          <p>We collect minimal data:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Search queries</strong> — When you use the search feature, your query is sent to our
              server to return results. We do not store search history linked to your identity.
            </li>
            <li>
              <strong>Telegram subscription</strong> — If you subscribe to our Telegram channel for job alerts,
              Telegram provides us your Telegram user ID. We use this solely to send job notifications.
            </li>
            <li>
              <strong>Analytics</strong> — We may use privacy-respecting analytics (page views, device type,
              country) to improve the website. No personal data is collected through analytics.
            </li>
            <li>
              <strong>Voice search audio</strong> — If you use voice search, audio is processed in your browser
              using the Web Speech API. No audio is sent to or stored on our servers.
            </li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> collect: names, email addresses, phone numbers, Aadhaar numbers,
            passwords, payment information, or any government ID.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">3. Tools — Client-Side Processing</h2>
          <p>
            Our free tools (Photo Resizer, Age Calculator, Salary Calculator) run entirely in your browser.
            No images, dates, or salary data are uploaded to our servers. All processing happens on your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">4. AI-Powered Search</h2>
          <p>
            When you use AI Search, your query may be sent to Google Gemini API for natural language processing.
            Google&apos;s privacy policy applies to that processing. We do not store AI search queries linked
            to your identity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">5. Cookies</h2>
          <p>
            We use essential cookies only (theme preference — light/dark mode). We do not use tracking cookies,
            advertising cookies, or third-party cookies for profiling.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">6. Data Sources</h2>
          <p>
            All job data displayed on SarkariAlert is sourced from official government websites and public
            employment notifications. We aggregate publicly available information and provide links to
            original sources. We do not claim ownership of government notification content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">7. Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Telegram Bot API</strong> — For sending job alert notifications to subscribers</li>
            <li><strong>Google Gemini API</strong> — For AI-powered search (optional feature)</li>
            <li><strong>IndexNow API</strong> — For search engine indexing (no user data involved)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">8. Data Retention</h2>
          <p>
            Job listings are retained as long as they remain relevant (typically until the application
            deadline passes). Telegram subscriber IDs are retained until the user unsubscribes.
            We do not retain any personal user data beyond what is described above.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">9. Your Rights (DPDPA 2023)</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023 (India), you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access information about what data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent (e.g., unsubscribe from Telegram alerts)</li>
            <li>File a grievance with the Data Protection Board of India</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">10. Children&apos;s Privacy</h2>
          <p>
            SarkariAlert is a general-purpose job information website. We do not knowingly collect personal
            data from children under 18. Government job eligibility typically requires applicants to be 18+.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">11. Security</h2>
          <p>
            We use HTTPS encryption, secure server configurations, and follow industry-standard security
            practices to protect the minimal data we handle.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">12. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with an
            updated date. Continued use of the website after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">13. Contact</h2>
          <p>
            For privacy-related queries or data requests, contact us at:{' '}
            <strong>privacy@sarkarialert.online</strong>
          </p>
        </section>
      </div>
    </div>
  );
}