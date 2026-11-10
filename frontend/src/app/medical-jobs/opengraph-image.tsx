import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Medical Government Jobs 2026 — Doctor, MBBS, BDS Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Medical Government Jobs 2026',
    subtitle: 'Doctor, MBBS, BDS, BAMS Sarkari Naukri',
    badge: 'MEDICAL',
    gradientFrom: '#1a3636',
    gradientVia: '#1a5050',
    gradientTo: '#0d7377',
  });
}
