import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'SBI PO 2026 — Jobs, Syllabus & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'SBI PO 2026 — Jobs, Syllabus & Results',
    subtitle: 'State Bank Probationary Officer Bharti',
    badge: 'SBI PO',
    gradientFrom: '#0d1a37',
    gradientVia: '#1a2a5c',
    gradientTo: '#2545ab',
  });
}
