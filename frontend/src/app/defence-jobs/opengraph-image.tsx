import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Defence Government Jobs 2026 — Indian Army, Navy, Air Force, DRDO';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Defence Government Jobs 2026',
    subtitle: 'Indian Army, Navy, Air Force, DRDO',
    badge: 'DEFENCE',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a4a2a',
    gradientTo: '#3a6a3a',
  });
}
