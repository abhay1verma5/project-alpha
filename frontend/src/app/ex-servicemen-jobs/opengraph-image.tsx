import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Ex-Servicemen Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Ex-Servicemen Government Jobs 2026',
    subtitle: 'पूर्व सैनिक सरकारी नौकरी — Reserved Posts',
    badge: 'EX-SERVICEMEN',
    gradientFrom: '#2e1a1a',
    gradientVia: '#4a2a2a',
    gradientTo: '#6a3a3a',
  });
}
