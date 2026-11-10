import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Pharmacy Government Jobs 2026 — B.Pharm, D.Pharm Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Pharmacy Government Jobs 2026',
    subtitle: 'B.Pharm, D.Pharm Sarkari Naukri',
    badge: 'PHARMACY',
    gradientFrom: '#1a362e',
    gradientVia: '#1a5046',
    gradientTo: '#0d7360',
  });
}
