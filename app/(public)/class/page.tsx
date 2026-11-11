import type { Metadata } from 'next'

import ClassScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Lớp học',
  description: 'Các lớp luyện chữ đẹp, toán tư duy, Soroban, tập viết và tin học cho trẻ 5-12 tuổi tại Hà Tiên.',
  alternates: { canonical: ROUTES.class },
}

const ClassPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Lớp học', path: ROUTES.class }])} />
    <ClassScreen />
  </>
)

export default ClassPage
