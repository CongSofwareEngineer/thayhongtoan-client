import type { Metadata } from 'next'

import FaqScreen from './client'

import JsonLd from '@/components/JsonLd'
import { FAQ_KEYS } from '@/constants/app'
import vn from '@/public/assets/language/vn.json'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema, faqSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Câu hỏi thường gặp',
  description: 'Giải đáp những thắc mắc phụ huynh hay hỏi nhất về lớp học, học phí và lịch học.',
  alternates: { canonical: ROUTES.faq },
}

// Questions are rendered on the page from the same keys, so the FAQ rich result stays valid
const FAQ_ITEMS = FAQ_KEYS.map((key) => ({
  question: (vn.faq as Record<string, string>)[`q${key}`],
  answer: (vn.faq as Record<string, string>)[`a${key}`],
})).filter((item) => item.question && item.answer)

const FaqPage = () => (
  <>
    <JsonLd data={[breadcrumbSchema([{ name: 'Câu hỏi thường gặp', path: ROUTES.faq }]), faqSchema(FAQ_ITEMS)]} />
    <FaqScreen />
  </>
)

export default FaqPage
