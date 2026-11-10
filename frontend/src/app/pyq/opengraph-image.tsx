import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Previous Year Questions — 10 Lakh+ PYQ';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Previous Year Questions — 10 Lakh+ PYQ',
    subtitle: 'पिछले साल के प्रश्न — Practice & Prepare',
    badge: 'PYQ',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2d2d6e',
    gradientTo: '#4a47a3',
  });
}
