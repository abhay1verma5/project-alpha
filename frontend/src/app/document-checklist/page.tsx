import type { Metadata } from 'next';
import { DocumentChecklistClient } from './DocumentChecklistClient';

export const metadata: Metadata = {
  title: 'Document Checklist — Government Exam Documents',
  description: 'Track all documents needed for government exam applications. Photo, marksheets, certificates, and ID proofs.',
};

export default function DocumentChecklistPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DocumentChecklistClient />
    </div>
  );
}
