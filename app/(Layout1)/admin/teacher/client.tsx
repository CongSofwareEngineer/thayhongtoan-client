'use client'
import React from 'react'

import useLanguage from '@/hooks/useLanguage'
import useGetTeacher from '@/hooks/react-query/useGetTeacher'
import { ITeacher } from '@/services/API/Teacher/type'
import { cn } from '@/utils/tailwind'
import MyTable from '@/components/MyTable'

const TeacherAdminScreen = () => {
  const { translate } = useLanguage()
  const { data: teachers = [], isLoading, isError, fetchNextPage, hasNextPage } = useGetTeacher({})

  const columns = [
    { key: 'name', label: translate('admin.name') },
    { key: 'email', label: translate('admin.email') },
    { key: 'phone', label: translate('admin.phone') },
  ]

  const renderCell = React.useCallback((item: ITeacher, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return item.name
      case 'email':
        return item.email || 'No Email'
      case 'phone':
        return item.sdt
      default:
        return null
    }
  }, [])

  if (isError) return <div className='text-danger text-center'>{translate('errors.serverError')}</div>

  return (
    <div className={cn('flex flex-col gap-6 w-full py-8')}>
      <div className={cn('flex justify-between items-center')}>
        <h1 className={cn('text-3xl font-bold')}>{translate('admin.teacherManagement')}</h1>
      </div>

      <MyTable
        ariaLabel='Teacher Table'
        columns={columns}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        items={teachers}
        renderCell={renderCell}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

export default TeacherAdminScreen
