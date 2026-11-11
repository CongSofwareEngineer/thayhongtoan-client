'use client'
import { useMemo, useState } from 'react'

import ClassCard from '@/components/ClassCard'
import EmptyState from '@/components/EmptyState'
import MyInput from '@/components/MyInput'
import MySelect from '@/components/MySelect'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { AcademicIcon } from '@/components/Icons/Academic'
import { SearchIcon } from '@/components/Icons/Search'
import { ROUTES } from '@/constants/routes'
import useDebounce from '@/hooks/useDebounce'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'

type SortMode = 'default' | 'priceAsc' | 'priceDesc'

const ClassScreen = () => {
  const { translate } = useLanguage()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortMode>('default')
  const keyword = useDebounce(search, 300)

  const { data: classes, isLoading } = useGetClassPublic({ limit: 50 })

  // Filter + sort locally; the catalogue is small enough that paging is overkill
  const list = useMemo(() => {
    let result = classes

    if (keyword) {
      const lower = keyword.toLowerCase()

      result = result.filter((item) => item.name?.toLowerCase().includes(lower) || item.note?.toLowerCase().includes(lower))
    }
    if (sort === 'priceAsc') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0))
    }
    if (sort === 'priceDesc') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0))
    }

    return result
  }, [classes, keyword, sort])

  return (
    <>
      <PageHeader breadcrumb={[{ label: translate('class.title') }]} description={translate('class.subtitle')} title={translate('class.title')} />

      <Section>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <MyInput
            className='sm:max-w-sm'
            placeholder={translate('placeholder.searchClass')}
            startContent={<SearchIcon className='size-5' />}
            value={search}
            onValueChange={setSearch}
          />
          <MySelect
            className='sm:max-w-56'
            label={translate('common.sort')}
            options={[
              { key: 'default', label: translate('common.default') },
              { key: 'priceAsc', label: `${translate('class.price')} ↑` },
              { key: 'priceDesc', label: `${translate('class.price')} ↓` },
            ]}
            value={sort}
            onValueChange={(value) => setSort(value as SortMode)}
          />
        </div>

        {isLoading ? (
          <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='h-80 rounded-box skeleton-loading' />
            ))}
          </div>
        ) : list.length === 0 ? (
          <EmptyState className='mt-10' icon={<AcademicIcon className='size-12' />} title={translate('register.notFoundClass')} />
        ) : (
          <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {list.map((item) => (
              <ClassCard key={item._id} data={item} />
            ))}
          </div>
        )}

        <p className='mt-10 rounded-box border border-primary/20 bg-primary/5 p-5 text-center text-sm text-base-content/70'>
          {translate('class.freeTrialNote')}{' '}
          <a className='font-semibold text-primary hover:underline' href={ROUTES.register}>
            {translate('register.registerNow')} →
          </a>
        </p>
      </Section>
    </>
  )
}

export default ClassScreen
