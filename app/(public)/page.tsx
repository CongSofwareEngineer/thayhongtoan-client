import type { Metadata } from 'next'

import HomeScreen from './client'

import { SITE_CONFIG } from '@/config/site'
import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: { canonical: ROUTES.home },
}

const HomePage = () => <HomeScreen />

export default HomePage
