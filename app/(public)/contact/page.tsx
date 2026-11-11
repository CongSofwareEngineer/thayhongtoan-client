import type { Metadata } from 'next'

import ContactScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ Thầy Hồng Toán để được tư vấn lớp học phù hợp cho con. Hotline 0344 798 392.',
  alternates: { canonical: ROUTES.contact },
}

const ContactPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Liên hệ', path: ROUTES.contact }])} />
    <ContactScreen />
  </>
)

export default ContactPage
