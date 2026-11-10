import type { Metadata } from 'next';
import { ApplyTrackerClient } from './ApplyTrackerClient';

export const metadata: Metadata = {
  title: 'Application Tracker — Track Your Exam Applications',
  description: 'Track all your government exam applications in one place. Monitor status from application to result.',
};

export default function ApplyTrackerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <ApplyTrackerClient />
    </div>
  );
}
