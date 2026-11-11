'use client'
import { useMemo, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { ClockIcon } from '@/components/Icons/Clock'
import { UsersIcon } from '@/components/Icons/Users'
import { ROUTES } from '@/constants/routes'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

// Vietnamese weekday labels as they appear inside a class "schedule" string
const DAY_KEYS = [
  { key: 'mon', match: ['thứ 2', 't2'] },
  { key: 'tue', match: ['thứ 3', 't3'] },
  { key: 'wed', match: ['thứ 4', 't4'] },
  { key: 'thu', match: ['thứ 5', 't5'] },
  { key: 'fri', match: ['thứ 6', 't6'] },
  { key: 'sat', match: ['thứ 7', 't7'] },
  { key: 'sun', match: ['chủ nhật', 'cn'] },
] as const

const ScheduleScreen = () => {
  const { translate } = useLanguage()
  const { data: classes, isLoading } = useGetClassPublic({ limit: 50 })
  const [activeDay, setActiveDay] = useState<string>('mon')

  // Group classes by weekday based on their schedule text
  const byDay = useMemo(() => {
    const map: Record<string, typeof classes> = {}

    DAY_KEYS.forEach(({ key, match }) => {
      map[key] = classes.filter((item) => {
        const text = (item.schedule || '').toLowerCase()

        return match.some((token) => text.includes(token))
      })
    })

    return map
  }, [classes])

  const renderClassRow = (item: (typeof classes)[number]) => (
    <a
      key={item._id}
      className='flex flex-col gap-2 rounded-box border border-base-300 bg-base-100 p-4 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between'
      href={ROUTES.classDetail(item._id)}
    >
      <div className='flex flex-col'>
        <span className='font-bold text-base-content'>{item.name}</span>
        {item.ageRange && <span className='text-xs text-base-content/50'>{item.ageRange}</span>}
      </div>
      <div className='flex flex-wrap items-center gap-4 text-sm text-base-content/70'>
        <span className='flex items-center gap-1.5'>
          <ClockIcon className='size-4 text-primary' />
          {item.attributes?.time || '—'}
        </span>
        <span className='flex items-center gap-1.5'>
          <UsersIcon className='size-4 text-primary' />
          {item.numberStudent || '—'}
        </span>
      </div>
    </a>
  )

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('schedulePage.title') }]}
        description={translate('schedulePage.subtitle')}
        title={translate('schedulePage.title')}
      />

      <Section>
        {/* Mobile: day tabs. Desktop: full week grid */}
        <div className='flex gap-2 overflow-x-auto pb-2 lg:hidden'>
          {DAY_KEYS.map(({ key }) => (
            <button
              key={key}
              className={cn(
                'shrink-0 rounded-field px-4 py-2 text-sm font-semibold transition-colors',
                activeDay === key ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content/70'
              )}
              type='button'
              onClick={() => setActiveDay(key)}
            >
              {translate(`schedulePage.${key}` as any)}
            </button>
          ))}
        </div>

        <div className='mt-4 flex flex-col gap-3 lg:hidden'>
          {isLoading ? (
            <div className='h-24 rounded-box skeleton-loading' />
          ) : byDay[activeDay]?.length ? (
            byDay[activeDay].map(renderClassRow)
          ) : (
            <EmptyState icon={<CalendarIcon className='size-10' />} title={translate('schedulePage.noClass')} />
          )}
        </div>

        <div className='hidden gap-4 lg:grid lg:grid-cols-7'>
          {DAY_KEYS.map(({ key }) => (
            <div key={key} className='flex flex-col gap-3'>
              <h3 className='rounded-field bg-primary/10 py-2 text-center text-sm font-bold text-primary'>
                {translate(`schedulePage.${key}` as any)}
              </h3>
              <div className='flex flex-col gap-3'>
                {byDay[key]?.length ? (
                  byDay[key].map((item) => (
                    <a
                      key={item._id}
                      className='flex flex-col gap-1 rounded-box border border-base-300 bg-base-100 p-3 text-sm transition-colors hover:border-primary/40'
                      href={ROUTES.classDetail(item._id)}
                    >
                      <span className='font-semibold text-base-content'>{item.name}</span>
                      <span className='flex items-center gap-1 text-xs text-base-content/60'>
                        <ClockIcon className='size-3.5 text-primary' />
                        {item.attributes?.time || '—'}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className='rounded-box border border-dashed border-base-300 p-3 text-center text-xs text-base-content/40'>
                    {translate('schedulePage.noClass')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className='mt-10 rounded-box border border-warning/30 bg-warning/10 p-4 text-center text-sm text-base-content/70'>
          {translate('schedulePage.note')}
        </p>
      </Section>
    </>
  )
}

export default ScheduleScreen
