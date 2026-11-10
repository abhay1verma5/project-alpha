import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Forest Guard Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Forest Guard Government Jobs 2026',
    subtitle: 'वन रक्षक / फॉरेस्ट गार्ड भर्ती',
    badge: 'FOREST GUARD',
    gradientFrom: '#0e2e0e',
    gradientVia: '#1a4a1a',
    gradientTo: '#2a6a2a',
    accentColor: '#2e7d32',
  });
}
