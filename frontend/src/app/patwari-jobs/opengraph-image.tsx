import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Patwari & Lekhpal Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Patwari & Lekhpal Jobs 2026',
    subtitle: 'पटवारी / लेखपाल भर्ती — Revenue Department',
    badge: 'PATWARI',
    gradientFrom: '#2e2a1a',
    gradientVia: '#5a4a2a',
    gradientTo: '#8a6a3a',
  });
}
