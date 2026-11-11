import type { Metadata } from 'next'

import GalleryScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Hình ảnh',
  description: 'Hình ảnh lớp học, hoạt động và khoảnh khắc của các bé tại lớp Thầy Hồng Toán.',
  alternates: { canonical: ROUTES.gallery },
}

const GalleryPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Hình ảnh', path: ROUTES.gallery }])} />
    <GalleryScreen />
  </>
)

export default GalleryPage
