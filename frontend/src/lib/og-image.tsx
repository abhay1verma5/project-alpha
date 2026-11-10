import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

interface OgImageConfig {
  title: string;
  subtitle?: string;
  badge?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  accentColor?: string;
}

export function generateOgImage({
  title,
  subtitle,
  badge,
  gradientFrom = '#0d2137',
  gradientVia = '#1a3a5c',
  gradientTo = '#2563eb',
  accentColor = '#ff6f00',
}: OgImageConfig) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientVia} 50%, ${gradientTo} 100%)`,
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              background: accentColor,
              color: 'white',
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '22px',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            SarkariAlert
          </div>
          {badge && (
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 600,
                display: 'flex',
              }}
            >
              {badge}
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '52px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '20px',
            display: 'flex',
            maxWidth: '1050px',
          }}
        >
          {title.length > 90 ? title.slice(0, 90) + '...' : title}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.4,
              display: 'flex',
              maxWidth: '900px',
            }}
          >
            {subtitle}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
          <div
            style={{
              background: 'rgba(16,185,129,0.2)',
              color: '#6ee7b7',
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            Daily Updates
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.9)',
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            Free Alerts
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '30px',
            right: '60px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          sarkarialert.online
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
