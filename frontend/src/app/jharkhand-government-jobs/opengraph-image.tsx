import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Jharkhand Government Jobs 2026 — JPSC, JSSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Jharkhand Government Jobs 2026',
    subtitle: 'झारखंड सरकारी नौकरी — JPSC, JSSC',
    badge: 'JHARKHAND',
    gradientFrom: '#2e1a1a',
    gradientVia: '#5a2a2a',
    gradientTo: '#8a3a3a',
  });
}
