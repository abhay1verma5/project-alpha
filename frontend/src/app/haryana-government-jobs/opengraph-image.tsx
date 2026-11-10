import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Haryana Government Jobs 2026 — HSSC, HCS Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Haryana Government Jobs 2026',
    subtitle: 'हरियाणा सरकारी नौकरी — HSSC, HCS',
    badge: 'HARYANA',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a5a2a',
    gradientTo: '#4a8a4a',
  });
}
