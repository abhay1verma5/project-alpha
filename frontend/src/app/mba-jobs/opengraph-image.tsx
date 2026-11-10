import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'MBA Government Jobs 2026 — Management Graduate Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'MBA Government Jobs 2026',
    subtitle: 'Management Graduate Sarkari Naukri',
    badge: 'MBA',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a2a5e',
    gradientTo: '#4a4a8e',
  });
}
