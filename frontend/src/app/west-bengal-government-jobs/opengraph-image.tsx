import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'West Bengal Government Jobs 2026 — WBPSC, SSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'West Bengal Government Jobs 2026',
    subtitle: 'पश्चिम बंगाल सरकारी नौकरी — WBPSC, SSC',
    badge: 'WEST BENGAL',
    gradientFrom: '#1a2e2e',
    gradientVia: '#2a4a5a',
    gradientTo: '#3a6a8a',
  });
}
