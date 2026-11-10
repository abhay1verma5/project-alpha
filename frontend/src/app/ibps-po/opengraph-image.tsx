import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'IBPS PO 2026 — Bank Jobs & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'IBPS PO 2026 — Bank Jobs & Results',
    subtitle: 'Probationary Officer — All Banks',
    badge: 'IBPS PO',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a3a5e',
    gradientTo: '#3a5a8e',
  });
}
