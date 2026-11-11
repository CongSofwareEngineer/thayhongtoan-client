import type { Metadata } from 'next'

import { Suspense } from 'react'

import RegisterScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Đăng ký học thử',
  description: 'Đăng ký học thử miễn phí một buổi tại lớp Thầy Hồng Toán. Thầy liên hệ lại trong 24 giờ.',
  alternates: { canonical: ROUTES.register },
}

const RegisterPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Đăng ký học thử', path: ROUTES.register }])} />
    <Suspense>
      <RegisterScreen />
    </Suspense>
  </>
)

export default RegisterPage
