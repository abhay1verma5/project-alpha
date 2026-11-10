import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Teacher Government Jobs 2026 — TGT, PGT, Primary Teacher Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Teacher Government Jobs 2026',
    subtitle: 'TGT, PGT, Primary Teacher Sarkari Naukri',
    badge: 'TEACHING',
    gradientFrom: '#2d1b3a',
    gradientVia: '#4a2d6e',
    gradientTo: '#7b47a3',
  });
}
