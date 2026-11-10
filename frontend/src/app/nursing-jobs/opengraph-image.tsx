import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Nursing Government Jobs 2026 — Staff Nurse, ANM, GNM Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Nursing Government Jobs 2026',
    subtitle: 'Staff Nurse, ANM, GNM Sarkari Naukri',
    badge: 'NURSING',
    gradientFrom: '#1a3636',
    gradientVia: '#1a5050',
    gradientTo: '#0d7377',
  });
}
