import { APP_NAME, APPLICATION_URL } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(APPLICATION_URL),
  title: {
    default: `${APP_NAME} | Discover & Share Startup Ideas`,
    template: `%s | ${APP_NAME}`
  },
  description: 'Join our innovative platform to discover, share, and validate startup ideas. Connect with entrepreneurs, get valuable feedback, and turn your vision into reality.',
  keywords: [
    'startup ideas',
    'entrepreneurship',
    'business innovation',
    'startup community',
    'idea validation',
    'startup feedback',
    'entrepreneur network',
    'business ideation',
    'startup platform',
    'startup ecosystem'
  ],
  authors: [
    { name: 'Muhammed sinan', url: 'https://muhammedsinan.space' }
  ],
  creator: 'Muhammed sinan',
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Technology',

  appleWebApp: {
    title: APP_NAME,
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/icons/apple-splash-2048-2732.jpg',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: '/icons/apple-splash-1668-2388.jpg',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
      },
      {
        url: '/icons/apple-splash-1290-2796.jpg',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)'
      }
    ],
    capable: true
  },

  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: `${APP_NAME} - Transform Your Ideas into Reality`,
    description: 'Join our innovative platform to discover, share, and validate startup ideas. Connect with entrepreneurs, get valuable feedback, and turn your vision into reality.',
    url: APPLICATION_URL,
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Startup Ideas Platform`,
        type: 'image/png',
      }
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Transform Your Ideas into Reality`,
    description: 'Discover, share, and validate startup ideas. Join our community of innovative entrepreneurs.',
    creator: '@sinanptm',
    images: [{
      url: '/assets/twitter-image.png',
      width: 1200,
      height: 630,
      alt: `${APP_NAME} - Startup Ideas Platform`,
    }],
  },

  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icons/android-icon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/icons/apple-icon.png' },
      { url: '/icons/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/icons/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/icons/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/icons/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/icons/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/icons/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/icons/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/icons/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-192x192.png',
        sizes: '192x192'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-144x144.png',
        sizes: '144x144'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-96x96.png',
        sizes: '96x96'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-72x72.png',
        sizes: '72x72'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-48x48.png',
        sizes: '48x48'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/icons/android-icon-36x36.png',
        sizes: '36x36'
      }
    ],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google815b889e8dec9b27',
  },

  alternates: {
    canonical: APPLICATION_URL,
    languages: {
      'en-US': APPLICATION_URL,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    "google-site-verification": "google815b889e8dec9b27",
    "msapplication-TileColor": "#8B0000",
    "msapplication-TileImage": "/icons/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
  },

  applicationName: APP_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
};

