import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@mantine/dates/styles.css'
import '@mantine/core/styles/global.css'

import '@/styles/aos.css'
import ClientRender from '@/components/ClientRender'
import MantineConfig from '@/components/MantineConfig'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import dynamic from 'next/dynamic'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import ClientApi from '@/services/clientApi'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LINK_CONTACT } from '@/constants/app'

const LoadingFirstPage = dynamic(() => import('@/components/LoadingFirstPage'))

const inter = Inter({ subsets: ['latin'] })

const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images:
    'https://res.cloudinary.com/tc-store/image/upload/v1743313576/thayhongtoan/192x192_mcjayw.jpg',
  url: 'https://thayhongtoan.vercel.app',
}
export const metadata: Metadata = {
  metadataBase: new URL(BaseMeta.url),
  title: BaseMeta.title,
  description: BaseMeta.description,
  keywords: ['Soro ban', 'Luyện chữ đẹp', 'Tập viết', 'Tin học', 'Toán tư duy', 'Toán Soro ban'],
  openGraph: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    images: BaseMeta.images,
    siteName: BaseMeta.title,
    url: BaseMeta.url,
    phoneNumbers: ['+84344798392'],
    locale: 'vi',
    emails: 'hodiencong2000@gmail.com',
    countryName: 'Vietnamese',
  },
  bookmarks: BaseMeta.url,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: BaseMeta.title,
  icons: {
    icon: { url: '/favicon.ico' },
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/favicon.ico' },
  },
  manifest: '/manifest.json',
  twitter: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    card: 'summary_large_image',
    images: BaseMeta.images,
    site: BaseMeta.url,
  },
  appleWebApp: {
    title: BaseMeta.title,
    capable: true,
  },
  verification: {
    // google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
  },
  appLinks: {
    web: {
      url: BaseMeta.url,
      should_fallback: true,
    },
  },
  category: 'fashion',
  facebook: {
    appId: 'tcstore.gl',
  },
  other: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Thầy Hồng Toán',
    url: BaseMeta.url,
    logo: BaseMeta.images,
    description: BaseMeta.description,
    sameAs: [LINK_CONTACT.FaceBook],
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menuCategory = await ClientApi.getCategory()

  return (
    <html {...mantineHtmlProps} lang='vi'>
      {process.env.NEXT_PUBLIC_ENV === 'production' && <GoogleTagManager gtmId='GTM-T7S7DKJ4' />}
      <link rel='canonical' href={BaseMeta.url} />
      <head>
        <ColorSchemeScript />

        {process.env.NEXT_PUBLIC_ENV === 'production' && (
          <>
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Store',
                  name: 'TC Store',
                  url: BaseMeta.url,
                  logo: 'https://bafybeie4dqtbl5dco4qgqbepjttfqrppawkj4evdgoytgoupfdjmfrne2m.ipfs.w3s.link/logo_tc_store.png',
                  description:
                    'Mua sắm giày dép, yến sào, laptop, cà phê và nhiều sản phẩm chất lượng.',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Thủ Dầu Một',
                    addressLocality: 'Bình Dương',
                    addressCountry: 'Việt nam',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+84-392-225-405',
                    contactType: 'hodiencong2000@gmail.com',
                  },
                }),
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        {process.env.NEXT_PUBLIC_ENV === 'production' && (
          <>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7S7DKJ4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          </>
        )}
        <MantineConfig>
          <ReactQueryProvider>
            <StyledComponentsRegistry>
              <ClientRender menuCategory={menuCategory?.data || []}> {children}</ClientRender>
              {/* <Footer /> */}
              <LoadingFirstPage />
            </StyledComponentsRegistry>
          </ReactQueryProvider>
        </MantineConfig>
        {process.env.NEXT_PUBLIC_ENV === 'production' && <SpeedInsights />}
      </body>
      {process.env.NEXT_PUBLIC_ENV === 'production' && <GoogleAnalytics gaId='G-QH99F8WFPW' />}
    </html>
  )
}
