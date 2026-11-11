'use client'
import Link from 'next/link'

import MyImage from '../MyImage'
import { CalendarIcon } from '../Icons/Calendar'
import { ClockIcon } from '../Icons/Clock'
import { UsersIcon } from '../Icons/Users'

import { ROUTES } from '@/constants/routes'
import { DemoClass } from '@/constants/demoData'
import useLanguage from '@/hooks/useLanguage'
import { formatPrice } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

type Props = {
  data: DemoClass
  className?: string
}

const ClassCard = ({ data, className }: Props) => {
  const { translate } = useLanguage()

  return (
    <Link
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl',
        className
      )}
      href={ROUTES.classDetail(data._id)}
    >
      <div className='relative h-48 w-full overflow-hidden bg-base-200'>
        <MyImage
          alt={data.name}
          className='!absolute !inset-0 !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105'
          src={data.image}
        />
        {data.ageRange && <span className='badge badge-primary absolute left-3 top-3 font-semibold'>{data.ageRange}</span>}
      </div>

      <div className='flex flex-1 flex-col gap-3 p-5'>
        <h3 className='text-lg font-bold text-base-content transition-colors group-hover:text-primary'>{data.name}</h3>
        {data.note && <p className='line-clamp-2-custom text-sm text-base-content/60'>{data.note}</p>}

        <div className='mt-auto flex flex-col gap-2 pt-2 text-sm text-base-content/70'>
          {data.schedule && (
            <span className='flex items-center gap-2'>
              <CalendarIcon className='size-4 shrink-0 text-primary' />
              {data.schedule}
            </span>
          )}
          {data.attributes?.time && (
            <span className='flex items-center gap-2'>
              <ClockIcon className='size-4 shrink-0 text-primary' />
              {data.attributes.time}
            </span>
          )}
          {!!data.numberStudent && (
            <span className='flex items-center gap-2'>
              <UsersIcon className='size-4 shrink-0 text-primary' />
              {translate('admin.maxStudent')}: {data.numberStudent}
            </span>
          )}
        </div>

        <div className='flex items-center justify-between border-t border-base-300 pt-3'>
          <span className='text-lg font-extrabold text-primary'>
            {formatPrice(data.price)}
            <span className='text-xs font-medium text-base-content/50'>{translate('class.perMonth')}</span>
          </span>
          <span className='text-sm font-semibold text-base-content/60 group-hover:text-primary'>{translate('common.detail')} →</span>
        </div>
      </div>
    </Link>
  )
}

export default ClassCard
