import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'GDS & Postal Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'GDS & Postal Jobs 2026',
    subtitle: 'Gramin Dak Sevak, Postman, MTS Bharti',
    badge: 'GDS/POSTAL',
    gradientFrom: '#2e2e1a',
    gradientVia: '#5a5a1a',
    gradientTo: '#8a7a2a',
  });
}
