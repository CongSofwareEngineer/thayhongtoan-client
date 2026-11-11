'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import MyImage from '@/components/MyImage'
import MyInput from '@/components/MyInput'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { BookOpenIcon } from '@/components/Icons/BookOpen'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { ClockIcon } from '@/components/Icons/Clock'
import { SearchIcon } from '@/components/Icons/Search'
import { ROUTES } from '@/constants/routes'
import useDebounce from '@/hooks/useDebounce'
import useGetBlog from '@/hooks/react-query/useGetBlog'
import useLanguage from '@/hooks/useLanguage'
import { getBlogReadTime } from '@/utils/blogContent'
import { formatDate } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

const BlogScreen = () => {
  const { translate } = useLanguage()
  const { data: posts, isLoading } = useGetBlog()
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState<string>('')
  const keyword = useDebounce(search, 300)

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((item) => item.tags || []))), [posts])

  const list = useMemo(() => {
    let result = posts

    if (keyword) {
      const lower = keyword.toLowerCase()

      result = result.filter((item) => item.title.toLowerCase().includes(lower) || item.description?.toLowerCase().includes(lower))
    }
    if (tag) {
      result = result.filter((item) => item.tags?.includes(tag))
    }

    return result
  }, [posts, keyword, tag])

  const [featured, ...rest] = list

  return (
    <>
      <PageHeader breadcrumb={[{ label: translate('blog.title') }]} description={translate('blog.subtitle')} title={translate('blog.title')} />

      <Section>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <MyInput
            className='sm:max-w-sm'
            placeholder={`${translate('common.search')}...`}
            startContent={<SearchIcon className='size-5' />}
            value={search}
            onValueChange={setSearch}
          />
          <div className='flex flex-wrap gap-2'>
            <button
              className={cn('badge badge-lg cursor-pointer', tag === '' ? 'badge-primary' : 'badge-ghost')}
              type='button'
              onClick={() => setTag('')}
            >
              {translate('common.all')}
            </button>
            {tags.map((item) => (
              <button
                key={item}
                className={cn('badge badge-lg cursor-pointer', tag === item ? 'badge-primary' : 'badge-ghost')}
                type='button'
                onClick={() => setTag(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='h-72 rounded-box skeleton-loading' />
            ))}
          </div>
        ) : list.length === 0 ? (
          <EmptyState className='mt-10' icon={<BookOpenIcon className='size-12' />} title={translate('common.noData')} />
        ) : (
          <>
            {featured && (
              <Link
                className='group mt-10 grid grid-cols-1 gap-6 overflow-hidden rounded-box border border-base-300 bg-base-100 transition-all hover:border-primary/40 hover:shadow-lg lg:grid-cols-2'
                href={ROUTES.blogDetail(featured.slug)}
              >
                <div className='relative aspect-video w-full overflow-hidden bg-base-200 lg:aspect-auto lg:h-full'>
                  <MyImage
                    alt={featured.title}
                    className='!absolute !inset-0 !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    src={featured.thumbnail}
                  />
                </div>
                <div className='flex flex-col justify-center gap-3 p-6 md:p-10'>
                  <span className='badge badge-soft badge-primary'>{translate('blog.latest')}</span>
                  <h2 className='text-2xl font-extrabold text-base-content transition-colors group-hover:text-primary md:text-3xl'>
                    {featured.title}
                  </h2>
                  <p className='text-base text-base-content/60'>{featured.description}</p>
                  <div className='flex items-center gap-4 text-xs text-base-content/50'>
                    <span className='flex items-center gap-1'>
                      <CalendarIcon className='size-4' />
                      {formatDate(featured.createdAt)}
                    </span>
                    <span className='flex items-center gap-1'>
                      <ClockIcon className='size-4' />
                      {featured.readTime || getBlogReadTime(featured.content)} {translate('blog.readTime')}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {rest.map((item) => (
                <Link
                  key={item._id}
                  className='group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'
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
                    {item.tags?.[0] && <span className='badge badge-soft badge-sm'>{item.tags[0]}</span>}
                    <h3 className='text-lg font-bold text-base-content transition-colors group-hover:text-primary'>{item.title}</h3>
                    <p className='line-clamp-2-custom text-sm text-base-content/60'>{item.description}</p>
                    <div className='mt-auto flex items-center gap-3 pt-3 text-xs text-base-content/50'>
                      <span className='flex items-center gap-1'>
                        <CalendarIcon className='size-3.5' />
                        {formatDate(item.createdAt)}
                      </span>
                      <span className='flex items-center gap-1'>
                        <ClockIcon className='size-3.5' />
                        {item.readTime || getBlogReadTime(item.content)} {translate('blog.readTime')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  )
}

export default BlogScreen
