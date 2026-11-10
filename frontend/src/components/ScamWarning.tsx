import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

/**
 * Shown on every job page. Fake-job and "pay to apply" scams are the most
 * reported fraud on India's cybercrime portal; 42% of WhatsApp users have
 * received one. Keep it short and in both languages.
 */
export function ScamWarning({ officialHost }: { officialHost?: string }) {
  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-4.5 h-4.5 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1">
          <p className="font-bold">
            Never pay anyone to apply, for a "guaranteed selection", or for a leaked paper.
            <span className="font-normal"> Exam fees are paid only on the official website{officialHost ? ` (${officialHost})` : ''}.</span>
          </p>
          <p className="text-[13px] text-amber-800 dark:text-amber-200">
            आवेदन के लिए किसी एजेंट, व्हाट्सऐप या टेलीग्राम ग्रुप को पैसे न दें। शुल्क केवल आधिकारिक वेबसाइट पर ही भरें।
          </p>
          <p className="text-[12px]">
            Found a wrong link or a scam copying this notice?{' '}
            <Link href="/contact" className="underline font-semibold">Report it</Link>
            {' · '}
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline">
              cybercrime.gov.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
