import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Walk-In Interview Govt Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Walk-In Interview Govt Jobs 2026',
    subtitle: 'वॉक-इन इंटरव्यू — बिना परीक्षा भर्ती',
    badge: 'WALK-IN',
    gradientFrom: '#1a2a1a',
    gradientVia: '#2a5a2a',
    gradientTo: '#3a8a3a',
  });
}
