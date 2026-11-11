'use client'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import MyImage from '@/components/MyImage'
import PageHeader from '@/components/PageHeader'
import Section, { SectionHeading } from '@/components/Section'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { ClockIcon } from '@/components/Icons/Clock'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { ROUTES } from '@/constants/routes'
import useGetBlog from '@/hooks/react-query/useGetBlog'
import useLanguage from '@/hooks/useLanguage'
import { IBlog } from '@/services/API/Blog/type'
import { getBlogReadTime } from '@/utils/blogContent'
import { formatDate } from '@/utils/functions'

// The post itself is resolved on the server (page.tsx); only the related list is fetched here
const BlogDetailClient = ({ post, children }: { post: IBlog; children: ReactNode }) => {
  const { translate } = useLanguage()
  const { data: posts } = useGetBlog()

  const related = useMemo(() => posts.filter((item) => item.slug !== post.slug).slice(0, 3), [posts, post.slug])
  const readTime = post.readTime || getBlogReadTime(post.content)

  return (
    <>
      <PageHeader breadcrumb={[{ label: translate('blog.title'), href: ROUTES.blog }, { label: post.title }]} title={post.title}>
        <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-base-content/60'>
          <span className='flex items-center gap-1.5'>
            <UserCircleIcon className='size-4' />
            {post.author}
          </span>
          <span className='flex items-center gap-1.5'>
            <CalendarIcon className='size-4' />
            {formatDate(post.createdAt)}
          </span>
          <span className='flex items-center gap-1.5'>
            <ClockIcon className='size-4' />
            {readTime} {translate('blog.readTime')}
          </span>
        </div>
      </PageHeader>

      <Section containerClassName='max-w-3xl py-10 md:py-14'>
        <div className='relative mb-8 aspect-video w-full overflow-hidden rounded-box bg-base-200'>
          <MyImage alt={post.title} className='!absolute !inset-0 !h-full !w-full object-cover' src={post.thumbnail} />
        </div>

        <p className='mb-6 border-l-4 border-primary bg-base-200 p-4 text-base font-medium text-base-content/80'>{post.description}</p>

        <article className='text-base'>{children}</article>

        <div className='mt-10 flex flex-wrap gap-2'>
          {post.tags?.map((tag) => (
            <span key={tag} className='badge badge-soft badge-primary'>
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section className='bg-base-200'>
          <SectionHeading align='left' title={translate('blog.related')} />
          <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {related.map((item) => (
              <Link
                key={item._id}
                className='group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 transition-all hover:-translate-y-1 hover:shadow-lg'
                href={ROUTES.blogDetail(item.slug)}
              >
                <div className='relative aspect-video w-full overflow-hidden bg-base-200'>
                  <MyImage
                    alt={item.title}
                    className='!absolute !inset-0 !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    src={item.thumbnail}
                  />
                </div>
                <div className='flex flex-1 flex-col gap-2 p-5'>
                  <h3 className='text-base font-bold text-base-content group-hover:text-primary'>{item.title}</h3>
                  <p className='line-clamp-2-custom text-sm text-base-content/60'>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

export default BlogDetailClient
