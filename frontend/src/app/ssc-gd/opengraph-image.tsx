import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'SSC GD Constable 2026 — Bharti & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'SSC GD Constable 2026 — Bharti & Results',
    subtitle: 'GD Constable — CRPF, BSF, CISF, SSB',
    badge: 'SSC GD',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a4a2a',
    gradientTo: '#3a6a3a',
  });
}
