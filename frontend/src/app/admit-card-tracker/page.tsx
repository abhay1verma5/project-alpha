import type { Metadata } from 'next';
import { AdmitCardTrackerClient } from './AdmitCardTrackerClient';

export const metadata: Metadata = {
  title: 'Admit Card Tracker 2026-27 — Never Miss Your Hall Ticket',
  description: 'Track admit card release dates for government exams 2026-27. SSC, UPSC, Railway, Banking, CTET hall ticket status tracker.',
};

export default function AdmitCardTrackerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AdmitCardTrackerClient />
    </div>
  );
}
