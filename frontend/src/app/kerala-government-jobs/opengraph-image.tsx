import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Kerala Government Jobs 2026 — Kerala PSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Kerala Government Jobs 2026',
    subtitle: 'केरल सरकारी नौकरी — Kerala PSC',
    badge: 'KERALA',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a5a2a',
    gradientTo: '#3a8a3a',
  });
}
