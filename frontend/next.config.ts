import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Practice pages were merged: PYQ (/pyq) = real past papers only,
  // Practice (/practice) = mock tests + daily quiz + AI quiz.
  async redirects() {
    return [
      { source: '/previous-papers', destination: '/pyq', permanent: true },
      { source: '/mock-tests', destination: '/practice?type=mock', permanent: true },
      { source: '/daily-quiz', destination: '/practice?type=daily', permanent: true },
      { source: '/ai-quiz', destination: '/practice?type=ai', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icon-192.png' },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path(favicon\\.ico|icon-192\\.png|icon-512\\.png|favicon\\.svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
