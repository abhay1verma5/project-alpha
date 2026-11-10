import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'UP Government Jobs 2026 — UPPSC, UPSSSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'UP Government Jobs 2026',
    subtitle: 'उत्तर प्रदेश सरकारी नौकरी — UPPSC, UPSSSC',
    badge: 'UTTAR PRADESH',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a2a5e',
    gradientTo: '#4a4a8e',
  });
}
