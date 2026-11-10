import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Sarkari Yojana 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Sarkari Yojana 2026',
    subtitle: 'सरकारी योजना — Government Schemes List',
    badge: 'YOJANA',
    gradientFrom: '#2e1a00',
    gradientVia: '#5c3a1a',
    gradientTo: '#eb8f25',
    accentColor: '#e65100',
  });
}
