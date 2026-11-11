'use client'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import PageHeader from '@/components/PageHeader'
import Section, { SectionHeading } from '@/components/Section'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { MoneyIcon } from '@/components/Icons/Money'
import { ROUTES } from '@/constants/routes'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'
import { formatMoney } from '@/utils/functions'

const TuitionScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { data: classes, isLoading } = useGetClassPublic({ limit: 50 })

  const policies = [
    translate('tuitionPage.policy1'),
    translate('tuitionPage.policy2'),
    translate('tuitionPage.policy3'),
    translate('tuitionPage.policy4'),
  ]

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('tuitionPage.title') }]}
        description={translate('tuitionPage.subtitle')}
        title={translate('tuitionPage.title')}
      />

      <Section>
        {isLoading ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='h-72 rounded-box skeleton-loading' />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {classes.map((item, index) => {
              const isFeatured = index === 1

              return (
                <div key={item._id} className={cnFeatured(isFeatured)}>
                  {isFeatured && <span className='badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2 font-bold'>★</span>}
                  <h3 className='text-lg font-bold text-base-content'>{item.name}</h3>
                  {item.ageRange && <span className='text-sm text-base-content/50'>{item.ageRange}</span>}

                  <p className='mt-2 text-3xl font-extrabold text-primary'>
                    {formatMoney(item.price)}
                    <span className='text-sm font-medium text-base-content/50'>{translate('class.perMonth')}</span>
                  </p>

                  <ul className='mt-4 flex flex-1 flex-col gap-2 text-sm text-base-content/70'>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                      {item.schedule || translate('class.schedule')}
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                      {item.attributes?.time || translate('class.time')}
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                      {translate('admin.maxStudent')}: {item.numberStudent}
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                      {translate('tuitionPage.includedMaterial')}
                    </li>
                  </ul>

                  <MyButton
                    className='mt-5 w-full font-semibold'
                    variant={isFeatured ? 'solid' : 'outline'}
                    onClick={() => router.push(`${ROUTES.register}?idClass=${item._id}`)}
                  >
                    {translate('register.registerNow')}
                  </MyButton>
                </div>
              )
            })}
          </div>
        )}
        <p className='mt-10 rounded-box border border-primary/20 bg-primary/5 p-5 text-center text-sm text-base-content/70'>
          {translate('tuitionPage.note')}
        </p>
      </Section>

      <Section className='bg-base-200'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <div className='flex flex-col gap-4'>
            <SectionHeading align='left' title={translate('tuitionPage.policyTitle')} />
            <ul className='flex flex-col gap-3'>
              {policies.map((item) => (
                <li key={item} className='flex items-start gap-3 rounded-box border border-base-300 bg-base-100 p-4 text-sm text-base-content/80'>
                  <CheckCircleIcon className='mt-0.5 size-5 shrink-0 text-primary' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col items-start justify-center gap-4 rounded-box border border-base-300 bg-base-100 p-8'>
            <MoneyIcon className='size-10 text-primary' />
            <h3 className='text-2xl font-extrabold text-base-content'>{translate('tuitionPage.payOnline')}</h3>
            <p className='text-sm text-base-content/60'>{translate('payment.subtitle')}</p>
            <MyButton className='font-semibold' onClick={() => router.push(ROUTES.payment)}>
              {translate('payment.title')}
            </MyButton>
          </div>
        </div>
      </Section>
    </>
  )
}

// Pricing card look; the middle plan is visually promoted
const cnFeatured = (isFeatured: boolean) =>
  [
    'relative flex flex-col rounded-box border bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg',
    isFeatured ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-base-300',
  ].join(' ')

export default TuitionScreen
