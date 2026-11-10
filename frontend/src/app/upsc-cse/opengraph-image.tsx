import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'UPSC CSE 2026 — IAS/IPS Preparation';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'UPSC CSE 2026 — IAS/IPS Preparation',
    subtitle: 'Civil Services — Prelims, Mains, Interview',
    badge: 'UPSC CSE',
    gradientFrom: '#1a1a1a',
    gradientVia: '#2a2a3a',
    gradientTo: '#3a3a5a',
  });
}
