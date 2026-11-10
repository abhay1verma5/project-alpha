import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Punjab Government Jobs 2026 — PPSC, PSSSB Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Punjab Government Jobs 2026',
    subtitle: 'पंजाब सरकारी नौकरी — PPSC, PSSSB',
    badge: 'PUNJAB',
    gradientFrom: '#2e2a1a',
    gradientVia: '#5a4a2a',
    gradientTo: '#8a6a3a',
  });
}
