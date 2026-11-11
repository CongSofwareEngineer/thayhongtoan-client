'use client'
import Link from 'next/link'
import { useMemo } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import StatCard from '@/components/StatCard'
import StarRating from '@/components/StarRating'
import { BarChart, ChartCard, DonutChart, LineChart, ProgressList } from '@/components/Charts'
import { AcademicIcon } from '@/components/Icons/Academic'
import { ChatIcon } from '@/components/Icons/Chat'
import { ClipboardIcon } from '@/components/Icons/Clipboard'
import { MoneyIcon } from '@/components/Icons/Money'
import { PlusIcon } from '@/components/Icons/Plus'
import { UsersIcon } from '@/components/Icons/Users'
import { MONTH_LABELS, PAYMENT_STATUS } from '@/constants/app'
import { AttendanceStatus } from '@/services/API/Attendance/type'
import { ROUTES } from '@/constants/routes'
import useGetAttendance from '@/hooks/react-query/useGetAttendance'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useGetComment from '@/hooks/react-query/useGetComment'
import useGetPayment from '@/hooks/react-query/useGetPayment'
import useGetRegister from '@/hooks/react-query/useGetRegister'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useLanguage from '@/hooks/useLanguage'
import { formatDate, formatMoney } from '@/utils/functions'

const AdminDashboard = () => {
  const { translate } = useLanguage()

  const { data: classes } = useGetClassPublic({ limit: 50 })
  const { data: students = [] } = useGetStudent({ limit: 100 } as any)
  const { data: payments = [] } = useGetPayment({ limit: 200 } as any)
  const { data: registers = [] } = useGetRegister({ limit: 20 })
  const { data: attendances = [] } = useGetAttendance({ limit: 200 })
  const { approved: comments, ratingAvg } = useGetComment({})

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  // Revenue for a given month, from the paid records
  const revenueOf = (month: number, year: number) =>
    payments
      .filter((item) => item.month === month && item.year === year && item.status === PAYMENT_STATUS.PAID)
      .reduce((sum, item) => sum + (item.amount || 0), 0)

  const revenueThisMonth = revenueOf(currentMonth, currentYear)
  const revenueLastMonth = revenueOf(currentMonth === 1 ? 12 : currentMonth - 1, currentMonth === 1 ? currentYear - 1 : currentYear)
  const revenueTrend = revenueLastMonth > 0 ? Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100) : 0

  // Last 6 months of revenue for the trend chart
  const revenueSeries = useMemo(() => {
    const series = []

    for (let offset = 5; offset >= 0; offset -= 1) {
      const date = new Date(currentYear, currentMonth - 1 - offset, 1)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      series.push({ label: MONTH_LABELS[month - 1], value: revenueOf(month, year) })
    }

    return series
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, currentMonth, currentYear])

  // Students grouped by class name
  const studentsPerClass = useMemo(() => {
    const counts = new Map<string, number>()

    students.forEach((student) => {
      const name = typeof student.idClass === 'string' ? student.idClass : (student.idClass as any)?.name

      if (name) {
        counts.set(name, (counts.get(name) || 0) + 1)
      }
    })

    if (counts.size === 0) {
      // Fall back to the catalogue so the chart is never a blank box
      classes.slice(0, 5).forEach((item) => counts.set(item.name, item.numberStudent || 0))
    }

    return Array.from(counts.entries()).map(([label, value]) => ({ label, value }))
  }, [students, classes])

  const tuitionBreakdown = useMemo(() => {
    const count = (status: PAYMENT_STATUS) => payments.filter((item) => item.month === currentMonth && item.status === status).length

    return [
      { label: translate('admin.paid'), value: count(PAYMENT_STATUS.PAID), color: 'var(--color-success)' },
      { label: translate('admin.partial'), value: count(PAYMENT_STATUS.PARTIAL), color: 'var(--color-warning)' },
      { label: translate('admin.unpaid'), value: count(PAYMENT_STATUS.UNPAID), color: 'var(--color-error)' },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, currentMonth])

  const tuitionTotal = tuitionBreakdown.reduce((sum, item) => sum + item.value, 0)

  // Present/late marks of the last 7 days, bucketed per weekday
  const attendanceSeries = useMemo(() => {
    const labels = [
      translate('schedulePage.mon'),
      translate('schedulePage.tue'),
      translate('schedulePage.wed'),
      translate('schedulePage.thu'),
      translate('schedulePage.fri'),
      translate('schedulePage.sat'),
      translate('schedulePage.sun'),
    ]
    const buckets = labels.map((label) => ({ label, value: 0 }))
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

    attendances.forEach((item) => {
      if (item.status === AttendanceStatus.OFF) {
        return
      }
      const date = new Date(item.day as string)

      if (Number.isNaN(date.getTime()) || date.getTime() < weekAgo) {
        return
      }
      // JS weeks start on Sunday; the chart starts on Monday
      buckets[(date.getDay() + 6) % 7].value += 1
    })

    return buckets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendances])

  const quickActions = [
    { href: ROUTES.admin.classes, label: translate('admin.addClass'), icon: <AcademicIcon /> },
    { href: ROUTES.admin.students, label: translate('admin.addStudent'), icon: <UsersIcon /> },
    { href: ROUTES.admin.attendance, label: translate('admin.takeAttendance'), icon: <ClipboardIcon /> },
    { href: ROUTES.admin.tuition, label: translate('admin.markAsPaid'), icon: <MoneyIcon /> },
  ]

  return (
    <AdminPage description={translate('admin.welcomeAdmin')} title={translate('admin.overview')}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard icon={<UsersIcon className='size-7' />} label={translate('admin.studentActive')} value={students.length} />
        <StatCard color='info' icon={<AcademicIcon className='size-7' />} label={translate('admin.classOpening')} value={classes.length} />
        <StatCard
          color='success'
          icon={<MoneyIcon className='size-7' />}
          label={translate('admin.revenue')}
          trend={revenueTrend}
          trendLabel={translate('admin.vsLastMonth')}
          value={formatMoney(revenueThisMonth)}
        />
        <StatCard color='warning' icon={<ClipboardIcon className='size-7' />} label={translate('admin.newRegister')} value={registers.length} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <ChartCard className='lg:col-span-2' title={translate('admin.revenueChart')}>
          <LineChart data={revenueSeries} formatValue={formatMoney} />
        </ChartCard>

        <ChartCard description={`${translate('admin.month')} ${currentMonth}`} title={translate('admin.tuitionChart')}>
          <DonutChart
            centerLabel={
              <>
                <span className='text-2xl font-extrabold text-base-content'>{tuitionTotal}</span>
                <span className='text-xs text-base-content/50'>{translate('admin.student')}</span>
              </>
            }
            data={tuitionBreakdown}
          />
        </ChartCard>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <ChartCard title={translate('admin.studentChart')}>
          <ProgressList data={studentsPerClass} />
        </ChartCard>

        <ChartCard title={translate('admin.attendanceChart')}>
          <BarChart data={attendanceSeries} height={200} />
        </ChartCard>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <AdminCard className='lg:col-span-2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-base font-bold text-base-content'>{translate('admin.recentComment')}</h3>
            <Link className='text-sm font-semibold text-primary hover:underline' href={ROUTES.admin.comments}>
              {translate('common.seeAll')}
            </Link>
          </div>

          <div className='flex items-center gap-3 rounded-box bg-base-200 p-3'>
            <span className='text-2xl font-extrabold text-primary'>{ratingAvg}</span>
            <StarRating size='sm' value={ratingAvg} />
          </div>

          <ul className='flex flex-col divide-y divide-base-300'>
            {comments.slice(0, 4).map((item) => (
              <li key={item._id} className='flex items-start gap-3 py-3'>
                <span className='flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>
                  {item.name.charAt(0)}
                </span>
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-sm font-bold text-base-content'>{item.name}</span>
                    <StarRating size='sm' value={item.rating} />
                  </div>
                  <p className='line-clamp-2-custom text-sm text-base-content/60'>{item.content}</p>
                </div>
                <span className='hidden shrink-0 text-xs text-base-content/40 sm:block'>{formatDate(item.createdAt)}</span>
              </li>
            ))}
            {comments.length === 0 && <li className='py-6 text-center text-sm text-base-content/50'>{translate('common.noData')}</li>}
          </ul>
        </AdminCard>

        <AdminCard>
          <h3 className='text-base font-bold text-base-content'>{translate('admin.quickAction')}</h3>
          <div className='flex flex-col gap-2'>
            {quickActions.map((item) => (
              <Link
                key={item.href}
                className='flex items-center gap-3 rounded-field border border-base-300 p-3 text-sm font-medium text-base-content/80 transition-colors hover:border-primary/40 hover:bg-base-200'
                href={item.href}
              >
                <span className='text-primary'>{item.icon}</span>
                {item.label}
                <PlusIcon className='ml-auto size-4 text-base-content/30' />
              </Link>
            ))}
          </div>

          <Link
            className='mt-2 flex items-center gap-2 rounded-field bg-primary/10 p-3 text-sm font-semibold text-primary hover:bg-primary/20'
            href={ROUTES.admin.comments}
          >
            <ChatIcon className='size-5' />
            {translate('admin.commentManagement')}
          </Link>
        </AdminCard>
      </div>
    </AdminPage>
  )
}

export default AdminDashboard
