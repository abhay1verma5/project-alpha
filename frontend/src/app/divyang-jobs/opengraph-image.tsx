import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Divyang/PwBD Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Divyang/PwBD Government Jobs 2026',
    subtitle: 'दिव्यांग सरकारी नौकरी — Reserved Posts',
    badge: 'DIVYANG',
    gradientFrom: '#1a3a2e',
    gradientVia: '#1a5a4a',
    gradientTo: '#1a7a6a',
  });
}
