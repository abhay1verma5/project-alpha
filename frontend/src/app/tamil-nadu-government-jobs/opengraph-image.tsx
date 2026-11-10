import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Tamil Nadu Government Jobs 2026 — TNPSC, TRB Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Tamil Nadu Government Jobs 2026',
    subtitle: 'तमिलनाडु सरकारी नौकरी — TNPSC, TRB',
    badge: 'TAMIL NADU',
    gradientFrom: '#2e1a2e',
    gradientVia: '#5a2a5a',
    gradientTo: '#8a4a8a',
  });
}
