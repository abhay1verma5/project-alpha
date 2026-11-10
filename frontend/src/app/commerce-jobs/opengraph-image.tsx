import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Commerce Government Jobs 2026 — B.Com, CA, CS Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Commerce Government Jobs 2026',
    subtitle: 'B.Com, CA, CS Sarkari Naukri',
    badge: 'COMMERCE',
    gradientFrom: '#2a1b3a',
    gradientVia: '#4a2d5e',
    gradientTo: '#6a4a8e',
  });
}
