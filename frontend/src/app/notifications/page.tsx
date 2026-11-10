import type { Metadata } from 'next';
import { NotificationsClient } from './NotificationsClient';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Manage your job notification preferences on SarkariAlert.',
};

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <NotificationsClient />
    </div>
  );
}
