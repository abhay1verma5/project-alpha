import type { Metadata } from 'next';
import { StudyPlannerClient } from './StudyPlannerClient';

export const metadata: Metadata = {
  title: 'Study Planner — Plan Your Exam Preparation',
  description: 'Create and track your study plan for government exams. Set daily goals and track progress.',
};

export default function StudyPlannerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <StudyPlannerClient />
    </div>
  );
}
