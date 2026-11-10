import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Post Office Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Post Office Government Jobs 2026',
    subtitle: 'GDS, Postman, Mail Guard, MTS Bharti',
    badge: 'POST OFFICE',
    gradientFrom: '#2e1a1a',
    gradientVia: '#5a2a2a',
    gradientTo: '#8a3a3a',
    accentColor: '#c62828',
  });
}
