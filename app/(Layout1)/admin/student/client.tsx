'use client'
import React, { useState } from 'react'
import { Tooltip } from '@heroui/tooltip'
import { SortDescriptor } from '@heroui/table'

import useLanguage from '@/hooks/useLanguage'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useQuerySearch from '@/hooks/useQuerySearch'
import useDebounce from '@/hooks/useDebounce'
import { IStudent } from '@/services/API/Student/type'
import { IClass } from '@/services/API/Class/type'
import { IStudentFilter } from '@/services/API/Student/type'
import { cn } from '@/utils/tailwind'
import { FilterIcon } from '@/components/Icons/Filter'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyTable from '@/components/MyTable'

const StudentAdminScreen = () => {
  const { translate } = useLanguage()
  const { query, updateQuery, clearAll } = useQuerySearch<IStudentFilter>()
  const [searchName, setSearchName] = React.useState<string>(query.name || '')
  const [filterClass, setFilterClass] = React.useState<string>(query.idClass || '')

  const valueSearchDebounce = useDebounce(searchName, 500)
  const valueFilterClassDebounce = useDebounce(filterClass, 500)

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'price',
    direction: 'ascending',
  })

  React.useEffect(() => {
    updateQuery('name', valueSearchDebounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearchDebounce])

  React.useEffect(() => {
    updateQuery('idClass', valueFilterClassDebounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueFilterClassDebounce])

  const { data: students = [], isLoading, isError, fetchNextPage, hasNextPage } = useGetStudent(query)

  const handleSearch = (value: string) => {
    setSearchName(value)
  }

  const handleFilterClass = (value: string) => {
    setFilterClass(value)
  }

  const columns = [
    { key: 'name', label: translate('admin.name') },
    { key: 'age', label: translate('admin.age') || 'Tuổi' },
    { key: 'parentName', label: translate('admin.parentName') || 'Tên phụ huynh' },
    { key: 'parentPhone', label: translate('admin.parentPhone') || 'SĐT phụ huynh' },
    { key: 'class', label: translate('admin.class') },
    { key: 'status', label: translate('admin.status') || 'Trạng thái' },
    { key: 'actions', label: translate('admin.actions') || 'Hành động' },
  ]

  const renderCell = React.useCallback((item: IStudent, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return item.name
      case 'age':
        return item.age
      case 'parentName':
        return item.idParent?.name || 'N/A'
      case 'parentPhone':
        return item.idParent?.phone || 'N/A'
      case 'class':
        return (item.idClass as IClass)?.name || 'No Class'
      case 'status':
        return item.status === 'active' ? 'Đang học' : 'Nghỉ học'
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <MyButton color='primary' size='sm' variant='flat' onClick={() => {}}>
              Sửa
            </MyButton>
            <MyButton color='danger' size='sm' variant='flat' onClick={() => {}}>
              Xóa
            </MyButton>
            {item.idParent && (
              <a href={`tel:${item.idParent.phone}`}>
                <MyButton color='success' size='sm' variant='flat'>
                  Liên hệ
                </MyButton>
              </a>
            )}
          </div>
        )
      default:
        return null
    }
  }, [])

  // Check if router.push needs to handle idClass query param preservation if needed,
  // but standard navigation usually doesn't strictly need it unless filtering persists.
  // For now simple push is fine.

  const renderMobileItem = React.useCallback(
    (item: IStudent) => {
      return (
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-lg font-bold text-primary'>{item.name}</h3>
              <p className='text-small text-default-500'>{(item?.idClass as IClass)?.name || 'N/A'}</p>
            </div>
            <div className='bg-primary/10 text-primary px-2 py-1 rounded-md text-small font-semibold'>{item.name || 'Không có biệt danh'}</div>
          </div>

          <div className='flex flex-col gap-1 text-small'>
            <div className='flex justify-between'>
              <span className='text-default-500'>{translate('admin.age') || 'Tuổi'}:</span>
              <span>{item.age}</span>
            </div>
            {/* Add other fields as necessary */}
          </div>

          <div className='flex gap-2 mt-2 pt-2 border-t border-default-100'>
            <MyButton
              className='flex-1'
              color='primary'
              size='sm'
              variant='flat'
              onClick={() => {
                // Define action or route if needed, e.g. edit student
              }}
            >
              {translate('placeholder.detail') || 'Chi tiết'}
            </MyButton>
          </div>
        </div>
      )
    },
    [translate]
  )

  if (isError) return <div className='text-danger text-center'>{translate('errors.serverError')}</div>

  return (
    <div className={cn('flex flex-col gap-6 w-full py-8')}>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <h1 className={cn('text-3xl font-bold')}>{translate('admin.studentManagement')}</h1>
        <div className='flex gap-4 items-center'>
          <MyInput placeholder={translate('admin.searchName') || 'Tìm kiếm tên'} value={searchName} onChange={(e) => handleSearch(e.target.value)} />
          {/* <MyInput // Removed as per instruction
            placeholder={translate('admin.filterClass') || 'Lọc theo lớp'}
            value={filterClass}
            onChange={(e) => handleFilterClass(e.target.value)}
          /> */}
          <Tooltip content={translate('common.noData') || 'Xóa bộ lọc'}>
            <MyButton  color='warning' onClick={clearAll}>
              <FilterIcon />
            </MyButton>
          </Tooltip>
          <MyButton color='primary' onClick={() => {}}>
            {translate('common.create') || 'Thêm mới'}
          </MyButton>
        </div>
      </div>

      <MyTable
        ariaLabel='Student Table'
        columns={columns}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        items={students}
        renderCell={renderCell}
        renderMobileItem={renderMobileItem}
        sortDescriptor={sortDescriptor}
        onLoadMore={fetchNextPage}
        onSortChange={setSortDescriptor}
      />
    </div>
  )
}

export default StudentAdminScreen
