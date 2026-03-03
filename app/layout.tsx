import '@/styles/aos.css'
import '@/styles/globals.scss'
import '@/styles/overrides.scss'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import ClientRender from '@/components/ClientRender'
import { HeroUIProvider } from '@/components/HeroUIProvider'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { robotoSlab } from '@/config/fonts'
import { SITE_CONFIG } from '@/config/site'
// import TeacherAPI from '@/services/API/Teacher'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s - ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,

  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    siteName: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    phoneNumbers: ['+84344798392'],
    locale: 'vi',
    emails: 'hodiencong2000@gmail.com',
    countryName: 'Vietnamese',
  },
  bookmarks: SITE_CONFIG.url,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: SITE_CONFIG.title,
  icons: {
    icon: { url: SITE_CONFIG.icon },
    shortcut: { url: SITE_CONFIG.icon },
    apple: { url: SITE_CONFIG.icon },
  },
  manifest: '/manifest.json',
  twitter: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    site: SITE_CONFIG.url,
  },
  appleWebApp: {
    title: SITE_CONFIG.title,
    capable: true,
  },
  // <meta name="google-site-verification" content="-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk" />
  verification: {
    // google: 'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8',
    google: process.env.MODE_DEPLOY ? '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk' : '',
    // me:'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8'
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
  userScalable: false,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const res = await TeacherAPI.infoMe()

  // console.log({ res: res })

  return (
    <html suppressHydrationWarning lang='vi'>
      <head>
        {process.env.MODE_DEPLOY && (
          <>
            {/* <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-N3KGG4XW');`,
              }}
            /> */}

            <script
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Education',
                  name: SITE_CONFIG.title,
                  url: SITE_CONFIG.url,
                  logo: SITE_CONFIG.images,
                  description: SITE_CONFIG.description,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Thành Phố Hà Tiên',
                    addressLocality: 'Kiên Giang',
                    addressCountry: 'Việt nam',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+84-344-798-392',
                    contactType: 'hodienhong8392@gmail.com',
                  },
                }),
              }}
              type='application/ld+json'
            />
          </>
        )}
      </head>
      {process.env.MODE_DEPLOY && <GoogleTagManager gtmId='GTM-N3KGG4XW' />}
      <body className={clsx(robotoSlab.variable)}>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <HeroUIProvider themeProps={{ attribute: 'class', defaultTheme: 'light', forcedTheme: 'light' }}>
              <ClientRender>{children}</ClientRender>
            </HeroUIProvider>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
      {process.env.MODE_DEPLOY && (
        <>
          {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-6PQHPT7TWN' />
            <script
              dangerouslySetInnerHTML={{
                __html: `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6PQHPT7TWN');`,
              }}
            /> */}
          <GoogleAnalytics gaId='G-6PQHPT7TWN' />
        </>
      )}
    </html>
  )
}
