import type { Metadata } from 'next';
import { SavedJobsClient } from './SavedJobsClient';

export const metadata: Metadata = {
  title: 'Saved Jobs — SarkariAlert',
  description: 'View your saved/bookmarked government job notifications on SarkariAlert.',
  robots: 'noindex',
};

export default function SavedJobsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <SavedJobsClient />
    </div>
  );
}
