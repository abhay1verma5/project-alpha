import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { BackToTop } from '@/components/BackToTop';
import { OnboardingTour } from '@/components/OnboardingTour';
import { SwipeNav } from '@/components/SwipeNav';
import { ServiceWorkerRegistration } from '@/components/ServiceWorker';
import './globals.css';
import './print.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: {
    default: 'SarkariAlert — Latest Government Jobs, Results & Admit Cards 2026',
    template: '%s | SarkariAlert',
  },
  description:
    'India\'s most comprehensive government job portal. Find latest sarkari naukri notifications, results, admit cards and answer keys from SSC, UPSC, Railway, Banking, Defence, State PSC. Free mock tests, PYQ practice, AI tools.',
  keywords: [
    'SarkariAlert', 'government jobs', 'sarkari naukri', 'sarkari result',
    'SSC', 'UPSC', 'Railway jobs', 'Bank jobs', 'Police jobs',
    'admit card', 'answer key', 'exam result', 'government jobs 2026',
    'sarkari naukri 2026', 'mock test', 'previous year questions',
    'current affairs', 'daily quiz', 'sarkari exam',
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  metadataBase: new URL('https://sarkarialert.online'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SarkariAlert',
    title: 'SarkariAlert — Latest Government Jobs, Results & Admit Cards 2026',
    description:
      'India\'s most comprehensive government job portal. Find latest sarkari naukri notifications, results, admit cards and answer keys from SSC, UPSC, Railway, Banking, Defence, State PSC.',
    url: 'https://sarkarialert.online',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SarkariAlert — Government Jobs, Results & Admit Cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SarkariAlert — Latest Government Jobs, Results & Admit Cards 2026',
    description:
      'India\'s most comprehensive government job portal. Find latest sarkari naukri notifications, results, admit cards and answer keys from SSC, UPSC, Railway, Banking, Defence, State PSC.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sarkarialert.online',
    languages: {
      'en-IN': 'https://sarkarialert.online',
      'hi-IN': 'https://sarkarialert.online',
    },
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

// ISR: cache all pages for 1 hour, serve stale while revalidating
export const revalidate = 3600;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
    { media: '(prefers-color-scheme: dark)', color: '#050a18' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://job-search-backend-nhz4.onrender.com" />
        <link rel="dns-prefetch" href="https://job-search-backend-nhz4.onrender.com" />
        <meta name="google-site-verification" content="3nNHDd_dFNckoihVWRMzg9eaBRYfjfbjh-X-IOaLZwY" />
        {/* Google Discover optimization */}
        <meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {/* hreflang for bilingual content */}
        <link rel="alternate" hrefLang="en-IN" href="https://sarkarialert.online" />
        <link rel="alternate" hrefLang="hi-IN" href="https://sarkarialert.online" />
        <link rel="alternate" hrefLang="x-default" href="https://sarkarialert.online" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SarkariAlert',
              url: 'https://sarkarialert.online',
              description: 'India\'s most comprehensive government job portal — SSC, UPSC, Railway, Banking, Defence, Police, State PSC.',
              inLanguage: ['en', 'hi'],
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://sarkarialert.online/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SarkariAlert',
              url: 'https://sarkarialert.online',
              logo: 'https://sarkarialert.online/favicon.svg',
              description: 'India\'s most comprehensive government job portal — SSC, UPSC, Railway, Banking, Defence, Police, State PSC.',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'abhaykumarverma910@gmail.com',
                contactType: 'customer support',
              },
              sameAs: ['https://t.me/sarkarialert_official'],
            }),
          }}
        />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        {/* Skip to content link — visible on keyboard focus */}
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <LanguageProvider>
            <SwipeNav>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main id="main-content" role="main" className="flex-1 pb-20 md:pb-0 overflow-x-hidden">{children}</main>
                <Footer />
                <BottomNav />
              </div>
            </SwipeNav>
            <BackToTop />
            <OnboardingTour />
            {/* Live region for screen reader announcements */}
            <div aria-live="polite" aria-atomic="true" id="sr-status" className="sr-only" />
          </LanguageProvider>
        </ThemeProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
