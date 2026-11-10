import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Bihar Government Jobs 2026 — BPSC, BSSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Bihar Government Jobs 2026',
    subtitle: 'बिहार सरकारी नौकरी — BPSC, BSSC',
    badge: 'BIHAR',
    gradientFrom: '#2e1a1a',
    gradientVia: '#5e2a2a',
    gradientTo: '#8e4a4a',
  });
}
