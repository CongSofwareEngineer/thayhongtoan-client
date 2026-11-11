'use client'
import { useState } from 'react'

import EmptyState from '@/components/EmptyState'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { AcademicIcon } from '@/components/Icons/Academic'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { ChatIcon } from '@/components/Icons/Chat'
import { MoneyIcon } from '@/components/Icons/Money'
import { PhoneIcon } from '@/components/Icons/Phone'
import { SearchIcon } from '@/components/Icons/Search'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { PAYMENT_STATUS } from '@/constants/app'
import useGetParent from '@/hooks/react-query/useGetParent'
import useGetPayment from '@/hooks/react-query/useGetPayment'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useLanguage from '@/hooks/useLanguage'
import { IClass } from '@/services/API/Class/type'
import { IStudent } from '@/services/API/Student/type'
import { formatMoney } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

const PHONE_REGEX = /^(0|\+84)(\d{9})$/

const StudentTrackingScreen = () => {
  const { translate } = useLanguage()
  const [phone, setPhone] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [error, setError] = useState('')

  const { data: parents = [], isLoading: isLoadingParent } = useGetParent({ phone: searchPhone })
  const parent = parents[0]

  const { data: students = [], isLoading: isLoadingStudents } = useGetStudent({ idParent: parent?._id } as any)
  const { data: payments = [] } = useGetPayment({ month: new Date().getMonth() + 1, year: new Date().getFullYear() } as any)

  const handleSearch = () => {
    if (!PHONE_REGEX.test(phone.trim())) {
      setError(translate('errors.errorSDT'))

      return
    }
    setError('')
    setSearchPhone(phone.trim())
  }

  // Find this month's payment record for a student
  const getStudentPayment = (studentId: string) =>
    payments.find((item) => {
      const id = typeof item.idStudent === 'string' ? item.idStudent : (item.idStudent as any)?._id

      return id === studentId
    })

  const statusLabel = (status?: string) => {
    if (status === PAYMENT_STATUS.PAID) {
      return { label: translate('admin.paid'), className: 'badge-success' }
    }
    if (status === PAYMENT_STATUS.PARTIAL) {
      return { label: translate('admin.partial'), className: 'badge-warning' }
    }

    return { label: translate('admin.unpaid'), className: 'badge-error' }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('tracking.title') }]}
        description={translate('tracking.subtitle')}
        title={translate('tracking.title')}
      />

      <Section>
        <div className='mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:flex-row sm:items-start'>
          <MyInput
            className='flex-1'
            errorMessage={error}
            inputMode='tel'
            label={translate('tracking.phoneLabel')}
            placeholder={translate('placeholder.enterNumberPhone')}
            startContent={<PhoneIcon className='size-5' />}
            value={phone}
            onValueChange={(value) => {
              setPhone(value)
              setError('')
            }}
          />
          <MyButton className='font-semibold sm:mt-7' isLoading={isLoadingParent || isLoadingStudents} size='lg' onClick={handleSearch}>
            <SearchIcon className='size-5' />
            {translate('tracking.searchBtn')}
          </MyButton>
        </div>

        {searchPhone && !isLoadingParent && !parent && (
          <EmptyState className='mx-auto mt-8 max-w-2xl' icon={<SearchIcon className='size-12' />} title={translate('tracking.notFound')} />
        )}

        {parent && (
          <div className='mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6'>
            <div className='flex flex-col gap-4 rounded-box bg-primary p-6 text-primary-content shadow-lg sm:flex-row sm:items-center sm:gap-10'>
              <div className='flex items-center gap-3'>
                <span className='flex size-12 items-center justify-center rounded-full bg-primary-content/20'>
                  <UserCircleIcon className='size-7' />
                </span>
                <div>
                  <p className='text-xs uppercase tracking-wide opacity-70'>{translate('admin.parentName')}</p>
                  <p className='font-bold'>{parent.name}</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='flex size-12 items-center justify-center rounded-full bg-primary-content/20'>
                  <PhoneIcon className='size-6' />
                </span>
                <div>
                  <p className='text-xs uppercase tracking-wide opacity-70'>{translate('admin.phone')}</p>
                  <p className='font-bold'>{parent.phone}</p>
                </div>
              </div>
            </div>

            {students.length === 0 && !isLoadingStudents ? (
              <EmptyState icon={<AcademicIcon className='size-12' />} title={translate('common.noData')} />
            ) : (
              students.map((student: IStudent) => {
                const studentClass = student.idClass as IClass
                const payment = getStudentPayment(student._id!)
                const status = statusLabel(payment?.status)

                return (
                  <div key={student._id} className='overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm'>
                    <div className='flex flex-col gap-5 p-6 md:flex-row'>
                      <div className='flex size-20 shrink-0 items-center justify-center rounded-box bg-primary/10 text-3xl font-extrabold text-primary'>
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div className='flex-1'>
                        <div className='flex flex-wrap items-start justify-between gap-3'>
                          <div>
                            <h3 className='text-xl font-extrabold text-base-content'>{student.name}</h3>
                            <p className='text-sm text-base-content/50'>
                              {student.age} {translate('admin.age').toLowerCase()}
                            </p>
                          </div>
                          <span className={cn('badge badge-lg font-semibold', status.className)}>{status.label}</span>
                        </div>

                        <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                          <div className='rounded-box bg-base-200 p-4'>
                            <p className='flex items-center gap-1.5 text-xs font-bold uppercase text-primary'>
                              <AcademicIcon className='size-4' />
                              {translate('admin.class')}
                            </p>
                            <p className='mt-1 font-bold text-base-content'>{studentClass?.name || translate('common.noData')}</p>
                            <p className='mt-1 flex items-center gap-1.5 text-sm text-base-content/60'>
                              <CalendarIcon className='size-4' />
                              {studentClass?.attributes?.time || '—'}
                            </p>
                            <p className='mt-2 flex items-center gap-1.5 text-sm font-bold text-primary'>
                              <MoneyIcon className='size-4' />
                              {formatMoney(studentClass?.price)}
                              {translate('class.perMonth')}
                            </p>
                          </div>

                          <div className='rounded-box bg-warning/10 p-4'>
                            <p className='flex items-center gap-1.5 text-xs font-bold uppercase text-warning'>
                              <ChatIcon className='size-4' />
                              {translate('tracking.evaluation')}
                            </p>
                            <p className='mt-2 text-sm italic text-base-content/70'>{payment?.note || translate('tracking.noEvaluation')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </Section>
    </>
  )
}

export default StudentTrackingScreen
