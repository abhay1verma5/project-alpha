import type { Metadata } from 'next';
import AlertsClient from './AlertsClient';

export const metadata: Metadata = {
  title: 'Job Alerts — Get Notified About New Government Jobs',
  description:
    'Set up free email alerts for government jobs. Choose your preferred categories (SSC, UPSC, Railway, Banking, Defence, Police, Teaching) and states. Get daily or weekly notifications for new sarkari naukri openings.',
  keywords: [
    'government job alerts', 'sarkari naukri notification', 'job alert email',
    'SSC job alert', 'UPSC notification', 'Railway job alert', 'Banking job alert',
    'free job alerts', 'sarkari job notification', 'government exam notification',
  ],
  openGraph: {
    title: 'Job Alerts — Get Notified About New Government Jobs',
    description:
      'Set up free email alerts for SSC, UPSC, Railway, Banking, Defence and other government jobs. Choose categories, states and frequency.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Job Alerts — SarkariAlert',
    description:
      'Set up free email alerts for government jobs. Choose categories, states, and notification frequency.',
  },
  alternates: {
    canonical: 'https://sarkarialert.online/alerts',
  },
};

export default function AlertsPage() {
  return <AlertsClient />;
}
