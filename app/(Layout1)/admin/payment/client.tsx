'use client'
import React from 'react'
import { Chip } from '@heroui/chip'

import useLanguage from '@/hooks/useLanguage'
import useGetPayment from '@/hooks/react-query/useGetPayment'
import { IPayment } from '@/services/API/Payment/type'
import { IClass } from '@/services/API/Class/type'
import { IStudent } from '@/services/API/Student/type'
import { cn } from '@/utils/tailwind'
import MyTable from '@/components/MyTable'

const PaymentAdminScreen = () => {
  const { translate } = useLanguage()
  const { data: payments = [], isLoading, isError, fetchNextPage, hasNextPage } = useGetPayment({})

  const columns = [
    { key: 'student', label: translate('admin.student') },
    { key: 'class', label: translate('admin.class') },
    { key: 'amount', label: translate('admin.amount') },
    { key: 'month', label: translate('admin.month') },
    { key: 'status', label: translate('admin.status') },
  ]

  const renderCell = React.useCallback((item: IPayment, columnKey: string) => {
    switch (columnKey) {
      case 'student':
        return (item.idStudent as IStudent)?.name || 'Unknown Student'
      case 'class':
        return (item.idClass as IClass)?.name || 'No Class'
      case 'amount':
        return `${item.amount.toLocaleString()} VND`
      case 'month':
        return `${item.month}/${item.year}`
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={item.status === 'paid' ? 'success' : item.status === 'partial' ? 'warning' : 'danger'}
            size='sm'
            variant='flat'
          >
            {item.status}
          </Chip>
        )
      default:
        return null
    }
  }, [])

  if (isError) return <div className='text-danger text-center'>{translate('errors.serverError')}</div>

  return (
    <div className={cn('flex flex-col gap-6 w-full py-8')}>
      <div className={cn('flex justify-between items-center')}>
        <h1 className={cn('text-3xl font-bold')}>{translate('admin.paymentManagement')}</h1>
      </div>

      <MyTable
        ariaLabel='Payment Table'
        columns={columns}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        items={payments}
        renderCell={renderCell}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

export default PaymentAdminScreen
