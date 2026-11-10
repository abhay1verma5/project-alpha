import type { Metadata } from 'next';
import { AIMathClient } from './AIMathClient';

export const metadata: Metadata = {
  title: 'AI Math Solver — Step-by-Step Solutions',
  description: 'Solve math problems with AI. Get step-by-step solutions for arithmetic, algebra, number series, and quantitative aptitude.',
};

export default function AIMathPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <AIMathClient />
    </div>
  );
}
