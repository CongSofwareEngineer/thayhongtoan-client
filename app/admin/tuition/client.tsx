'use client'
import { useMemo, useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import StatCard from '@/components/StatCard'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyInputNumber from '@/components/MyInputNumber'
import MySelect from '@/components/MySelect'
import MyTable, { Column } from '@/components/MyTable'
import { DonutChart } from '@/components/Charts'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { MoneyIcon } from '@/components/Icons/Money'
import { PencilIcon } from '@/components/Icons/Pencil'
import { SearchIcon } from '@/components/Icons/Search'
import { MONTH_LABELS, PAYMENT_STATUS } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import useDebounce from '@/hooks/useDebounce'
import useGetClass from '@/hooks/react-query/useGetClass'
import useGetPayment from '@/hooks/react-query/useGetPayment'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import PaymentAPI from '@/services/API/Payment'
import { IPayment } from '@/services/API/Payment/type'
import { formatMoney } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const nameOf = (value: any) => (typeof value === 'string' ? '' : value?.name || '')

const STATUS_BADGE: Record<string, string> = {
  [PAYMENT_STATUS.PAID]: 'badge-success',
  [PAYMENT_STATUS.PARTIAL]: 'badge-warning',
  [PAYMENT_STATUS.UNPAID]: 'badge-error',
}

const PaymentFormBody = ({ item, onDone }: { item: IPayment; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const [amount, setAmount] = useState<number | undefined>(item.amount)
  const [status, setStatus] = useState<string>(item.status || PAYMENT_STATUS.UNPAID)
  const [note, setNote] = useState(item.note || '')
  const [saving, setSaving] = useState(false)

  const onSave = async () => {
    setSaving(true)
    try {
      await PaymentAPI.update(item._id!, { amount, status: status as IPayment['status'], note })
      showNotificationSuccess(translate('admin.updatedSuccess'))
      onDone()
      close()
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='rounded-box bg-base-200 p-4 text-sm'>
        <p className='font-bold text-base-content'>{nameOf(item.idStudent) || translate('admin.student')}</p>
        <p className='text-base-content/60'>
          {nameOf(item.idClass)} · {translate('admin.month')} {item.month}/{item.year}
        </p>
      </div>

      <MyInputNumber formatComma endContent='đ' label={translate('admin.amount')} value={amount} onChange={setAmount} />

      <MySelect
        label={translate('admin.status')}
        options={[
          { key: PAYMENT_STATUS.PAID, label: translate('admin.paid') },
          { key: PAYMENT_STATUS.PARTIAL, label: translate('admin.partial') },
          { key: PAYMENT_STATUS.UNPAID, label: translate('admin.unpaid') },
        ]}
        value={status}
        onValueChange={setStatus}
      />

      <MyInputArea
        label={translate('tracking.evaluation')}
        minRows={3}
        placeholder={translate('placeholder.enterNote')}
        value={note}
        onValueChange={setNote}
      />

      <div className='flex justify-end gap-2 pt-2'>
        <MyButton variant='ghost' onClick={close}>
          {translate('common.cancel')}
        </MyButton>
        <MyButton className='font-semibold' isLoading={saving} onClick={onSave}>
          {translate('common.save')}
        </MyButton>
      </div>
    </div>
  )
}

const TuitionManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()

  const now = new Date()
  const [month, setMonth] = useState<number>(now.getMonth() + 1)
  const [year] = useState<number>(now.getFullYear())
  const [status, setStatus] = useState<string>('')
  const [idClass, setIdClass] = useState<string>('')
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: classes } = useGetClass({ limit: 50 })
  const {
    data: payments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPayment({
    month,
    year,
    idClass: idClass || undefined,
    status: (status as IPayment['status']) || undefined,
    limit: 100,
  })

  // Search by student name happens client-side; the API filters by class/status
  const list = useMemo(() => {
    if (!keyword) {
      return payments
    }
    const lower = keyword.toLowerCase()

    return payments.filter((item) => nameOf(item.idStudent).toLowerCase().includes(lower))
  }, [payments, keyword])

  const summary = useMemo(() => {
    const totalPaid = payments.filter((item) => item.status === PAYMENT_STATUS.PAID).reduce((sum, item) => sum + (item.amount || 0), 0)
    const countBy = (value: PAYMENT_STATUS) => payments.filter((item) => item.status === value).length

    return {
      totalPaid,
      paid: countBy(PAYMENT_STATUS.PAID),
      partial: countBy(PAYMENT_STATUS.PARTIAL),
      unpaid: countBy(PAYMENT_STATUS.UNPAID),
    }
  }, [payments])

  const columns: Column[] = [
    { key: 'student', label: translate('admin.student') },
    { key: 'class', label: translate('admin.class') },
    { key: 'amount', label: translate('admin.amount') },
    { key: 'status', label: translate('admin.status'), align: 'center' },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  // One-click "paid" shortcut straight from the row
  const markAsPaid = async (item: IPayment) => {
    try {
      await PaymentAPI.update(item._id!, { status: PAYMENT_STATUS.PAID as IPayment['status'] })
      showNotificationSuccess(translate('admin.updatedSuccess'))
      refetch()
    } catch {
      showNotificationError(translate('errors.serverError'))
    }
  }

  const openForm = (item: IPayment) =>
    open({
      title: translate('admin.tuitionManagement'),
      size: 'lg',
      children: <PaymentFormBody item={item} onDone={refetch} />,
    })

  const renderStatus = (item: IPayment) => (
    <span className={cn('badge badge-sm font-semibold', STATUS_BADGE[item.status] || 'badge-ghost')}>
      {item.status === PAYMENT_STATUS.PAID
        ? translate('admin.paid')
        : item.status === PAYMENT_STATUS.PARTIAL
          ? translate('admin.partial')
          : translate('admin.unpaid')}
    </span>
  )

  const renderCell = (item: IPayment, columnKey: string) => {
    switch (columnKey) {
      case 'student':
        return <span className='font-semibold text-base-content'>{nameOf(item.idStudent) || '—'}</span>
      case 'class':
        return nameOf(item.idClass) || '—'
      case 'amount':
        return <span className='font-semibold text-primary'>{formatMoney(item.amount)}</span>
      case 'status':
        return renderStatus(item)
      case 'actions':
        return (
          <div className='flex items-center justify-end gap-1'>
            {item.status !== PAYMENT_STATUS.PAID && (
              <button
                aria-label={translate('admin.markAsPaid')}
                className='btn btn-square btn-ghost btn-sm text-success'
                type='button'
                onClick={() => markAsPaid(item)}
              >
                <CheckCircleIcon className='size-4' />
              </button>
            )}
            <button aria-label={translate('common.edit')} className='btn btn-square btn-ghost btn-sm' type='button' onClick={() => openForm(item)}>
              <PencilIcon className='size-4' />
            </button>
          </div>
        )
      default:
        return (item as any)[columnKey] ?? '—'
    }
  }

  const renderMobileItem = (item: IPayment) => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start justify-between gap-2'>
        <span className='font-bold text-base-content'>{nameOf(item.idStudent) || '—'}</span>
        {renderStatus(item)}
      </div>
      <span className='text-sm text-base-content/60'>{nameOf(item.idClass)}</span>
      <span className='font-semibold text-primary'>{formatMoney(item.amount)}</span>
      <div className='flex gap-2'>
        {item.status !== PAYMENT_STATUS.PAID && (
          <MyButton color='success' size='sm' variant='outline' onClick={() => markAsPaid(item)}>
            <CheckCircleIcon className='size-4' />
            {translate('admin.markAsPaid')}
          </MyButton>
        )}
        <MyButton size='sm' variant='outline' onClick={() => openForm(item)}>
          <PencilIcon className='size-4' />
          {translate('common.edit')}
        </MyButton>
      </div>
    </div>
  )

  return (
    <AdminPage description={translate('admin.tuitionManagementDesc')} title={translate('admin.tuitionManagement')}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard color='success' icon={<MoneyIcon className='size-7' />} label={translate('admin.revenue')} value={formatMoney(summary.totalPaid)} />
        <StatCard color='success' icon={<CheckCircleIcon className='size-7' />} label={translate('admin.paid')} value={summary.paid} />
        <StatCard color='warning' icon={<MoneyIcon className='size-7' />} label={translate('admin.partial')} value={summary.partial} />
        <StatCard color='error' icon={<MoneyIcon className='size-7' />} label={translate('admin.unpaid')} value={summary.unpaid} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <AdminCard className='lg:col-span-2'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            <MyInput
              placeholder={translate('placeholder.searchStudent')}
              startContent={<SearchIcon className='size-5' />}
              value={search}
              onValueChange={setSearch}
            />
            <MySelect
              options={MONTH_LABELS.map((label, index) => ({ key: String(index + 1), label }))}
              value={String(month)}
              onValueChange={(value) => setMonth(Number(value))}
            />
            <MySelect
              options={[{ key: '', label: translate('admin.all') }, ...classes.map((entry) => ({ key: entry._id!, label: entry.name }))]}
              value={idClass}
              onValueChange={setIdClass}
            />
            <MySelect
              options={[
                { key: '', label: translate('admin.all') },
                { key: PAYMENT_STATUS.PAID, label: translate('admin.paid') },
                { key: PAYMENT_STATUS.PARTIAL, label: translate('admin.partial') },
                { key: PAYMENT_STATUS.UNPAID, label: translate('admin.unpaid') },
              ]}
              value={status}
              onValueChange={setStatus}
            />
          </div>

          <MyTable
            ariaLabel={QUERY_KEY.Payment}
            columns={columns}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            items={list}
            renderCell={renderCell as any}
            renderMobileItem={renderMobileItem as any}
            onLoadMore={fetchNextPage}
          />
        </AdminCard>

        <AdminCard>
          <h3 className='text-base font-bold text-base-content'>{translate('admin.tuitionChart')}</h3>
          <DonutChart
            centerLabel={
              <>
                <span className='text-2xl font-extrabold text-base-content'>{payments.length}</span>
                <span className='text-xs text-base-content/50'>{translate('admin.student')}</span>
              </>
            }
            data={[
              { label: translate('admin.paid'), value: summary.paid, color: 'var(--color-success)' },
              { label: translate('admin.partial'), value: summary.partial, color: 'var(--color-warning)' },
              { label: translate('admin.unpaid'), value: summary.unpaid, color: 'var(--color-error)' },
            ]}
            size={160}
          />
        </AdminCard>
      </div>
    </AdminPage>
  )
}

export default TuitionManagement
