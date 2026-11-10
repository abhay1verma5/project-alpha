import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Group D Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Group D Government Jobs 2026',
    subtitle: 'MTS, Peon, Safaiwala — Group D Bharti',
    badge: 'GROUP D',
    gradientFrom: '#2e1a2e',
    gradientVia: '#4a2a4a',
    gradientTo: '#6a3a6a',
  });
}
