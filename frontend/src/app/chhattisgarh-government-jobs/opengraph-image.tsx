import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Chhattisgarh Government Jobs 2026 — CGPSC, VYAPAM Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Chhattisgarh Government Jobs 2026',
    subtitle: 'छत्तीसगढ़ सरकारी नौकरी — CGPSC, VYAPAM',
    badge: 'CHHATTISGARH',
    gradientFrom: '#2e2a1a',
    gradientVia: '#5a4a2a',
    gradientTo: '#8a6a3a',
  });
}
