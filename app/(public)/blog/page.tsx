import type { Metadata } from 'next'

import BlogScreen from './client'

import JsonLd from '@/components/JsonLd'
import { ROUTES } from '@/constants/routes'
import { breadcrumbSchema } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Chia sẻ',
  description: 'Bài viết của Thầy Hồng về phương pháp dạy con học, luyện chữ đẹp và toán tư duy cho trẻ tiểu học.',
  alternates: { canonical: ROUTES.blog },
}

const BlogPage = () => (
  <>
    <JsonLd data={breadcrumbSchema([{ name: 'Chia sẻ', path: ROUTES.blog }])} />
    <BlogScreen />
  </>
)

export default BlogPage
