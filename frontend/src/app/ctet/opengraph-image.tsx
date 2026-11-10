import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'CTET 2026 — Teacher Eligibility Test';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'CTET 2026 — Teacher Eligibility Test',
    subtitle: 'Central Teacher Eligibility Test Guide',
    badge: 'CTET',
    gradientFrom: '#2d1b3a',
    gradientVia: '#4a2d6e',
    gradientTo: '#7b47a3',
  });
}
