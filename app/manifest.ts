import { MetadataRoute } from 'next'

import { SITE_CONFIG } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.title,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: SITE_CONFIG.lang,
    background_color: '#ffffff',
    theme_color: SITE_CONFIG.themeColor,
    categories: ['education', 'kids'],
    icons: [
      { src: '/36x36.png', sizes: '36x36', type: 'image/png' },
      { src: '/48x48.png', sizes: '48x48', type: 'image/png' },
      { src: '/72x72.png', sizes: '72x72', type: 'image/png' },
      { src: '/96x96.png', sizes: '96x96', type: 'image/png' },
      { src: '/144x144.png', sizes: '144x144', type: 'image/png' },
      { src: '/192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
