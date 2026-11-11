import type { Metadata } from 'next'

import PaymentScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Thanh toán học phí',
  description: 'Thanh toán học phí nhanh bằng mã QR ngân hàng, hệ thống tự động đối soát.',
  alternates: { canonical: ROUTES.payment },
}

const PaymentPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Thanh toán học phí', path: ROUTES.payment }])} />
    <PaymentScreen />
  </>
)

export default PaymentPage
