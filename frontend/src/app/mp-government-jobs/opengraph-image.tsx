import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'MP Government Jobs 2026 — MPPSC, MPESB Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'MP Government Jobs 2026',
    subtitle: 'मध्य प्रदेश सरकारी नौकरी — MPPSC, MPESB',
    badge: 'MADHYA PRADESH',
    gradientFrom: '#1a2e2e',
    gradientVia: '#2a5a5e',
    gradientTo: '#4a8a8e',
  });
}
