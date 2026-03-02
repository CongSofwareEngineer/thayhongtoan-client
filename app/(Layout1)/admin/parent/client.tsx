'use client'
import React from 'react'
import { Tooltip } from '@heroui/tooltip'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyTable from '@/components/MyTable'
import useGetParent from '@/hooks/react-query/useGetParent'
import useQuerySearch from '@/hooks/useQuerySearch'
import useLanguage from '@/hooks/useLanguage'
import useDebounce from '@/hooks/useDebounce'
import { IParent, IParentFilter } from '@/services/API/Parent/type'
import { cn } from '@/utils/tailwind'
import { FilterIcon } from '@/components/Icons/Filter'

const ParentAdminScreen = () => {
  const { translate } = useLanguage()
  const { query, updateQuery, clearAll } = useQuerySearch<IParentFilter>()
  const [searchName, setSearchName] = React.useState<string>(query.name || '')

  const valueSearchDebounce = useDebounce(searchName, 500)

  React.useEffect(() => {
    updateQuery('name', valueSearchDebounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearchDebounce])

  const handleSearch = (value: string) => {
    setSearchName(value)
  }

  const { data: parents = [], isLoading, isError, fetchNextPage, hasNextPage } = useGetParent(query)

  const columns = [
    { key: 'name', label: translate('admin.name') },
    { key: 'phone', label: translate('admin.phone') || 'Số điện thoại' },
    { key: 'address', label: translate('admin.address') || 'Địa chỉ' },
    { key: 'note', label: translate('admin.note') || 'Ghi chú' },
    { key: 'actions', label: translate('admin.actions') || 'Hành động' },
  ]

  const renderCell = React.useCallback((item: IParent, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return item.name
      case 'phone':
        return item.phone
      case 'address':
        return item.address || 'N/A'
      case 'note':
        return item.note || 'N/A'
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <MyButton color='primary' size='sm' variant='flat' onPress={() => {}}>
              Sửa
            </MyButton>
            <MyButton color='danger' size='sm' variant='flat' onPress={() => {}}>
              Xóa
            </MyButton>
          </div>
        )
      default:
        return null
    }
  }, [])

  const renderMobileItem = React.useCallback(
    (item: IParent) => {
      return (
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-lg font-bold text-primary'>{item.name}</h3>
              <p className='text-small text-default-500'>{item.phone}</p>
            </div>
          </div>

          <div className='flex flex-col gap-1 text-small'>
            <div className='flex justify-between'>
              <span className='text-default-500'>{translate('admin.address') || 'Địa chỉ'}:</span>
              <span className='text-right'>{item.address || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-default-500'>{translate('admin.note') || 'Ghi chú'}:</span>
              <span className='text-right max-w-[200px] truncate'>{item.note || 'N/A'}</span>
            </div>
          </div>

          <div className='flex gap-2 mt-2 pt-2 border-t border-default-100'>
            <MyButton className='flex-1' color='primary' size='sm' variant='flat' onPress={() => {}}>
              Sửa
            </MyButton>
            <MyButton className='flex-1' color='danger' size='sm' variant='flat' onPress={() => {}}>
              Xóa
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
      <div className={cn('flex justify-between items-center')}>
        <h1 className={cn('text-3xl font-bold')}>{translate('admin.parentManagement') || 'Quản lý phụ huynh'}</h1>
        <div className='flex gap-4 items-center'>
          <MyInput placeholder={translate('admin.searchName') || 'Tìm kiếm tên'} value={searchName} onChange={(e) => handleSearch(e.target.value)} />
          <Tooltip content={translate('common.noData') || 'Xóa bộ lọc'}>
            <MyButton isIconOnly color='warning' onPress={clearAll}>
              <FilterIcon />
            </MyButton>
          </Tooltip>
        </div>
      </div>

      <MyTable
        ariaLabel='Parent Table'
        columns={columns}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        items={parents}
        renderCell={renderCell}
        renderMobileItem={renderMobileItem}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

export default ParentAdminScreen
