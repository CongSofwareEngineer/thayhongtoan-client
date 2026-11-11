import type { Metadata } from 'next'

import TuitionScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Học phí',
  description: 'Bảng học phí minh bạch từng lớp, chính sách ưu đãi và hướng dẫn thanh toán online.',
  alternates: { canonical: ROUTES.tuition },
}

const TuitionPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Học phí', path: ROUTES.tuition }])} />
    <TuitionScreen />
  </>
)

export default TuitionPage
