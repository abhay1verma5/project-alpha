import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Delhi Government Jobs 2026 — DSSSB, MCD Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Delhi Government Jobs 2026',
    subtitle: 'दिल्ली सरकारी नौकरी — DSSSB, MCD',
    badge: 'DELHI',
    gradientFrom: '#0d2137',
    gradientVia: '#1a3a5c',
    gradientTo: '#2563eb',
  });
}
