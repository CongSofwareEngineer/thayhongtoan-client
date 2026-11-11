import type { Metadata } from 'next'

import StudentTrackingScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Tra cứu học tập',
  description: 'Phụ huynh tra cứu tình hình học tập, điểm danh và học phí của con bằng số điện thoại đã đăng ký.',
  alternates: { canonical: ROUTES.tracking },
}

const StudentTrackingPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Tra cứu học tập', path: ROUTES.tracking }])} />
    <StudentTrackingScreen />
  </>
)

export default StudentTrackingPage
