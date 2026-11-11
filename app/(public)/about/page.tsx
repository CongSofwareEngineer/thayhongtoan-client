import type { Metadata } from 'next'

import AboutScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Câu chuyện 10 năm dạy học của Thầy Hồng Toán: luyện chữ đẹp, toán tư duy và Soroban cho trẻ 5-12 tuổi.',
  alternates: { canonical: ROUTES.about },
}

const AboutPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Giới thiệu', path: ROUTES.about }])} />
    <AboutScreen />
  </>
)

export default AboutPage
