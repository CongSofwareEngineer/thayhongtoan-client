import type { Metadata } from 'next'

import ClassDetailClient from './client'

import JsonLd from '@/components/JsonLd'
import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { DEMO_CLASSES, DemoClass } from '@/constants/demoData'
import { ROUTES } from '@/constants/routes'
import ClassAPI from '@/services/API/Class'
import { breadcrumbSchema, courseSchema } from '@/utils/seo'

// Resolve the class on the server so metadata and Course markup describe the real class
const getClass = async (id: string): Promise<DemoClass | null> => {
  const res = await ClassAPI.get<DemoClass[]>('get-all', { page: 1, limit: PAGE_SIZE_LIMIT })
  const found = (res?.data || []).find((entry) => entry?._id === id)

  return found || DEMO_CLASSES.find((entry) => entry._id === id) || null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const item = await getClass(id)
  const description = item?.description || item?.note || 'Thông tin chi tiết lớp học tại Thầy Hồng Toán.'

  return {
    title: item?.name || 'Chi tiết lớp học',
    description,
    alternates: { canonical: ROUTES.classDetail(id) },
    openGraph: {
      type: 'website',
      title: item?.name,
      description,
      url: ROUTES.classDetail(id),
      ...(item?.image ? { images: [{ url: item.image, alt: item.name }] } : {}),
    },
  }
}

const ClassDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const item = await getClass(id)

  return (
    <>
      {item && (
        <JsonLd
          data={[
            courseSchema({
              id,
              name: item.name,
              description: item.description || item.note,
              image: item.image,
              price: item.price,
              ageRange: item.ageRange,
              duration: item.schedule || item.attributes?.time,
            }),
            breadcrumbSchema([{ name: 'Lớp học', path: ROUTES.class }, { name: item.name }]),
          ]}
        />
      )}
      <ClassDetailClient id={id} />
    </>
  )
}

export default ClassDetailPage
