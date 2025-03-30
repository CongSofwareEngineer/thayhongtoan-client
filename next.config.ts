import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    reactRemoveProperties: true,
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
  },
}

//for production
if (process.env.NEXT_PUBLIC_ENV === 'production') {
  nextConfig.eslint = {
    ignoreDuringBuilds: true,
  }
  nextConfig.experimental = {
    optimizePackageImports: [
      'moment',
      'lodash',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@tanstack/react-query',
      'styled-components',
    ],
    turbo: {
      minify: true,
    },
  }
  nextConfig.output = 'standalone'
  nextConfig.reactStrictMode = true

  nextConfig.compress = true
  nextConfig.productionBrowserSourceMaps = false

  nextConfig.cleanDistDir = true
  nextConfig.compiler = {
    ...nextConfig.compiler,
    removeConsole: true,
  }
}

export default nextConfig
