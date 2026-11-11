import type { NextConfig } from 'next'

import path from 'node:path'

const isBuildProduction = !!process.env.NEXT_PUBLIC_BUILD

const nextConfig: NextConfig = {
  // Pin the Turbopack root: a package-lock.json outside the repo would otherwise be picked up
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  productionBrowserSourceMaps: !isBuildProduction,
  reactStrictMode: true,
  cleanDistDir: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  // @blocknote/server-util renders stored blog blocks to HTML in Server Components
  serverExternalPackages: ['@blocknote/server-util', 'jsdom', 'html-encoding-sniffer'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-device-detect', 'zustand', 'react-toastify', '@tanstack/react-query'],
  },
  redirects: async () => [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
  ],
}

if (isBuildProduction) {
  console.log('building for production')

  nextConfig.compiler = {
    reactRemoveProperties: true,
    removeConsole: { exclude: ['error', 'warn'] },
  }
}

export default nextConfig
