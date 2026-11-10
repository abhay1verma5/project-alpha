import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Graduate Government Jobs 2026 — Sarkari Naukri for Graduates';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Graduate Government Jobs 2026',
    subtitle: 'Graduation Pass Sarkari Naukri — All Departments',
    badge: 'GRADUATE',
    gradientFrom: '#0d2137',
    gradientVia: '#1a3a5c',
    gradientTo: '#2563eb',
  });
}
