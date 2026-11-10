import type { Metadata } from 'next';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact SarkariAlert for queries about government jobs, technical issues, or feedback.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">We&apos;d love to hear from you. Reach out for any queries, feedback, or suggestions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { icon: Mail, title: 'Email', value: 'abhaykumarverma910@gmail.com', href: 'mailto:abhaykumarverma910@gmail.com', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' },
          { icon: MessageSquare, title: 'Telegram', value: 'Join our Channel', href: 'https://t.me/sarkarialert_official', color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' },
          { icon: MapPin, title: 'Location', value: 'India', href: null, color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300' },
          { icon: Clock, title: 'Response Time', value: 'Within 24-48 hours', href: null, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300' },
        ].map((item) => (
          <div key={item.title} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{item.title}</h3>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">{item.value}</a>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Queries</h2>
        <div className="space-y-4">
          {[
            { q: 'I found incorrect information about a job', a: 'Please email us with the job title and the correct information. We update our data daily from official sources.' },
            { q: 'How can I get notifications for new jobs?', a: 'Join our Telegram channel for instant updates. We also plan to add email and push notifications soon.' },
            { q: 'Is SarkariAlert affiliated with any government body?', a: 'No. SarkariAlert is an independent information aggregation platform. Always verify from official websites.' },
            { q: 'Can I advertise on SarkariAlert?', a: 'We currently do not offer advertising. Contact us at the email above for collaboration inquiries.' },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{item.q}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
