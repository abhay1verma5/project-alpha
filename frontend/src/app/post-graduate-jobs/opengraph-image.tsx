import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Post Graduate Government Jobs 2026 — MA, M.Sc, M.Com Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Post Graduate Government Jobs 2026',
    subtitle: 'MA, M.Sc, M.Com Sarkari Naukri',
    badge: 'PG JOBS',
    gradientFrom: '#1a2a3a',
    gradientVia: '#2a3a5a',
    gradientTo: '#3a5a8a',
  });
}
