import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Law Government Jobs 2026 — LLB, Advocate Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Law Government Jobs 2026',
    subtitle: 'LLB, Advocate Sarkari Naukri',
    badge: 'LAW',
    gradientFrom: '#2e2e1a',
    gradientVia: '#4a4a2a',
    gradientTo: '#6a6a3a',
  });
}
