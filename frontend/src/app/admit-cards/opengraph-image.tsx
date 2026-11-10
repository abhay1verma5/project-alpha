import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Admit Card 2026 — Download Hall Ticket';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Admit Card 2026 — Download Hall Ticket',
    subtitle: 'एडमिट कार्ड डाउनलोड करें — All Exams',
    badge: 'ADMIT CARDS',
    gradientFrom: '#371a0d',
    gradientVia: '#5c3a1a',
    gradientTo: '#eb8a25',
  });
}
