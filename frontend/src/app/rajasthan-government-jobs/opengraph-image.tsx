import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Rajasthan Government Jobs 2026 — RPSC, RSMSSB Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Rajasthan Government Jobs 2026',
    subtitle: 'राजस्थान सरकारी नौकरी — RPSC, RSMSSB',
    badge: 'RAJASTHAN',
    gradientFrom: '#2e2e1a',
    gradientVia: '#5e5a2a',
    gradientTo: '#8e8a4a',
  });
}
