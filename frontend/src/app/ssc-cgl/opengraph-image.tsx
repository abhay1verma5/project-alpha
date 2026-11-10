import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'SSC CGL 2026 — Jobs, Syllabus & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'SSC CGL 2026 — Jobs, Syllabus & Results',
    subtitle: 'Combined Graduate Level — Complete Guide',
    badge: 'SSC CGL',
    gradientFrom: '#0d2137',
    gradientVia: '#1a3a5c',
    gradientTo: '#2563eb',
  });
}
