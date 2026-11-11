import '@/styles/aos.css'
import '@/styles/globals.css'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import ClientRender from '@/components/ClientRender'
import JsonLd from '@/components/JsonLd'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import { robotoSlab } from '@/config/fonts'
import { SITE_CONFIG } from '@/config/site'
import { organizationSchema, websiteSchema } from '@/utils/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s - ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.business.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.business.name,
  publisher: SITE_CONFIG.business.name,
  category: 'education',
  alternates: {
    canonical: '/',
    languages: { vi: '/' },
  },
  // openGraph/twitter images come from app/opengraph-image.tsx + app/twitter-image.tsx
  openGraph: {
    type: 'website',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    phoneNumbers: [SITE_CONFIG.business.phone],
    emails: [SITE_CONFIG.business.email],
    locale: SITE_CONFIG.locale,
    countryName: 'Vietnam',
  },
  bookmarks: SITE_CONFIG.url,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  applicationName: SITE_CONFIG.title,
  icons: {
    icon: [
      { url: SITE_CONFIG.icon, sizes: '48x48' },
      { url: '/192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: { url: SITE_CONFIG.icon },
    apple: { url: SITE_CONFIG.appleIcon, sizes: '180x180' },
  },
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.url,
  },
  appleWebApp: {
    title: SITE_CONFIG.shortName,
    capable: true,
    statusBarStyle: 'default',
  },
  formatDetection: { telephone: true, address: true },
  verification: {
    google: process.env.MODE_DEPLOY ? SITE_CONFIG.googleVerification : '',
  },
}

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'light',
  userScalable: true,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning data-theme='thayhong' lang={SITE_CONFIG.lang}>
      <head>
        {/* Site-wide structured data: always rendered so it can be validated outside production too */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      {process.env.MODE_DEPLOY && <GoogleTagManager gtmId='GTM-N3KGG4XW' />}
      <body className={clsx(robotoSlab.variable, 'font-sans antialiased')}>
        <ReactQueryProvider>
          <ClientRender>{children}</ClientRender>
        </ReactQueryProvider>
      </body>
      {process.env.MODE_DEPLOY && <GoogleAnalytics gaId='G-6PQHPT7TWN' />}
    </html>
  )
}
