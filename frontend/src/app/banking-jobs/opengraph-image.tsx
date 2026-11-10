import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Banking Government Jobs 2026 — IBPS PO, SBI Clerk, RBI Bank Jobs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Banking Government Jobs 2026',
    subtitle: 'IBPS PO, SBI Clerk, RBI — Bank Jobs',
    badge: 'BANKING',
    gradientFrom: '#0d2137',
    gradientVia: '#1a4a5c',
    gradientTo: '#1a7a8b',
  });
}
