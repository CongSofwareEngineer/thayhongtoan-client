import type { Metadata } from 'next'

import ScheduleScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Lịch học',
  description: 'Thời khóa biểu các lớp luyện chữ, toán tư duy và Soroban trong tuần tại lớp Thầy Hồng Toán.',
  alternates: { canonical: ROUTES.schedule },
}

const SchedulePage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Lịch học', path: ROUTES.schedule }])} />
    <ScheduleScreen />
  </>
)

export default SchedulePage
