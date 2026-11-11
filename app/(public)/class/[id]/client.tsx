'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import ClassCard from '@/components/ClassCard'
import CommentSection from '@/components/CommentSection'
import EmptyState from '@/components/EmptyState'
import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import PageHeader from '@/components/PageHeader'
import Section, { SectionHeading } from '@/components/Section'
import { AcademicIcon } from '@/components/Icons/Academic'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { ClockIcon } from '@/components/Icons/Clock'
import { MoneyIcon } from '@/components/Icons/Money'
import { UsersIcon } from '@/components/Icons/Users'
import { ROUTES } from '@/constants/routes'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'
import { formatMoney } from '@/utils/functions'

const ClassDetailClient = ({ id }: { id: string }) => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { data: classes, isLoading } = useGetClassPublic({ limit: 50 })

  const current = useMemo(() => classes.find((item) => item._id === id), [classes, id])
  const related = useMemo(() => classes.filter((item) => item._id !== id).slice(0, 3), [classes, id])

  if (isLoading) {
    return (
      <Section>
        <div className='h-96 w-full rounded-box skeleton-loading' />
      </Section>
    )
  }

  if (!current) {
    return (
      <Section>
        <EmptyState
          action={
            <MyButton className='mt-2' onClick={() => router.push(ROUTES.class)}>
              {translate('class.title')}
            </MyButton>
          }
          icon={<AcademicIcon className='size-12' />}
          title={translate('class.notFound')}
        />
      </Section>
    )
  }

  const facts = [
    { icon: <MoneyIcon />, label: translate('class.price'), value: `${formatMoney(current.price)}${translate('class.perMonth')}` },
    { icon: <CalendarIcon />, label: translate('class.schedule'), value: current.schedule || '—' },
    { icon: <ClockIcon />, label: translate('class.time'), value: current.attributes?.time || '—' },
    { icon: <UsersIcon />, label: translate('admin.maxStudent'), value: String(current.numberStudent || '—') },
  ]

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('class.title'), href: ROUTES.class }, { label: current.name }]}
        description={current.note}
        title={current.name}
      />

      <Section>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
          <div className='flex flex-col gap-8 lg:col-span-2'>
            <div className='relative aspect-video w-full overflow-hidden rounded-box bg-base-200 shadow-lg'>
              <MyImage alt={current.name} className='!absolute !inset-0 !h-full !w-full object-cover' src={current.image} />
              {current.ageRange && <span className='badge badge-primary absolute left-4 top-4 font-semibold'>{current.ageRange}</span>}
            </div>

            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl font-extrabold text-base-content'>{translate('class.overview')}</h2>
              <p className='text-base leading-relaxed text-base-content/70'>{current.description || current.note}</p>
            </div>

            {current.program && current.program.length > 0 && (
              <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-extrabold text-base-content'>{translate('class.program')}</h2>
                <ul className='flex flex-col gap-2'>
                  {current.program.map((item) => (
                    <li key={item} className='flex items-start gap-3 rounded-field bg-base-200 p-3 text-sm text-base-content/80'>
                      <CheckCircleIcon className='mt-0.5 size-5 shrink-0 text-primary' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {current.outcome && current.outcome.length > 0 && (
              <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-extrabold text-base-content'>{translate('class.outcome')}</h2>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  {current.outcome.map((item) => (
                    <div key={item} className='flex items-start gap-3 rounded-box border border-success/20 bg-success/5 p-4 text-sm'>
                      <CheckCircleIcon className='mt-0.5 size-5 shrink-0 text-success' />
                      <span className='text-base-content/80'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky enrol card */}
          <aside className='lg:sticky lg:top-24 lg:h-fit'>
            <div className='flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-lg'>
              <div>
                <span className='text-sm text-base-content/50'>{translate('class.price')}</span>
                <p className='text-3xl font-extrabold text-primary'>
                  {formatMoney(current.price)}
                  <span className='text-sm font-medium text-base-content/50'>{translate('class.perMonth')}</span>
                </p>
              </div>

              <ul className='flex flex-col gap-3 border-y border-base-300 py-4'>
                {facts.map((fact) => (
                  <li key={fact.label} className='flex items-center justify-between gap-3 text-sm'>
                    <span className='flex items-center gap-2 text-base-content/60'>
                      <span className='text-primary'>{fact.icon}</span>
                      {fact.label}
                    </span>
                    <span className='text-right font-semibold text-base-content'>{fact.value}</span>
                  </li>
                ))}
              </ul>

              <MyButton className='w-full font-semibold' size='lg' onClick={() => router.push(`${ROUTES.register}?idClass=${current._id}`)}>
                {translate('class.registerThisClass')}
              </MyButton>
              <Link className='text-center text-sm font-medium text-base-content/60 hover:text-primary hover:underline' href={ROUTES.contact}>
                {translate('class.contactToRegister')}
              </Link>

              <p className='rounded-field bg-primary/5 p-3 text-center text-xs text-base-content/60'>{translate('class.freeTrialNote')}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section className='bg-base-200'>
        <SectionHeading align='left' title={translate('comment.title')} />
        <div className='mt-8'>
          <CommentSection idClass={current._id} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeading align='left' title={translate('class.relatedClass')} />
          <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {related.map((item) => (
              <ClassCard key={item._id} data={item} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

export default ClassDetailClient
