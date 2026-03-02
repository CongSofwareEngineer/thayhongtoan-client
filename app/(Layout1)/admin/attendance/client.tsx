'use client'
import React from 'react'
import { Chip } from '@heroui/chip'

import useLanguage from '@/hooks/useLanguage'
import useGetAttendance from '@/hooks/react-query/useGetAttendance'
import { IAttendance } from '@/services/API/Attendance/type'
import { IClass } from '@/services/API/Class/type'
import { IStudent } from '@/services/API/Student/type'
import { cn } from '@/utils/tailwind'
import MyTable from '@/components/MyTable'

const AttendanceAdminScreen = () => {
  const { translate } = useLanguage()
  const { data: attendances = [], isLoading, isError, fetchNextPage, hasNextPage } = useGetAttendance({})

  const columns = [
    { key: 'student', label: translate('admin.student') },
    { key: 'class', label: translate('admin.class') },
    { key: 'day', label: translate('admin.day') },
    { key: 'status', label: translate('admin.status') },
  ]

  const renderCell = React.useCallback((item: IAttendance, columnKey: string) => {
    switch (columnKey) {
      case 'student':
        return (item.idStudent as IStudent)?.name || 'Unknown Student'
      case 'class':
        return (item.idClass as IClass)?.name || 'No Class'
      case 'day':
        return new Date(item.day).toLocaleDateString()
      case 'status':
        return (
          <Chip className='capitalize' color={item.status === 'present' ? 'success' : 'danger'} size='sm' variant='flat'>
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
        <h1 className={cn('text-3xl font-bold')}>{translate('admin.attendanceManagement')}</h1>
      </div>

      <MyTable
        ariaLabel='Attendance Table'
        columns={columns}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        items={attendances}
        renderCell={renderCell}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

export default AttendanceAdminScreen
