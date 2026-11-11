'use client'
import React, { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Search, CheckCircle } from 'lucide-react'
import { Tabs, Tab } from '@heroui/tabs'

import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'

const TuitionManagement = () => {
  const { translate } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const columns = [
    { key: 'name', label: translate('admin.student').toUpperCase() },
    { key: 'class', label: translate('admin.class').toUpperCase() },
    { key: 'amount', label: translate('admin.amount').toUpperCase() },
    { key: 'status', label: translate('admin.status').toUpperCase() },
    { key: 'actions', label: translate('admin.actions').toUpperCase() },
  ]

  const records = [
    {
      _id: '1',
      name: 'Nguyễn Văn Tí',
      class: 'Lớp 1 - Toán Cơ Bản',
      amount: '500,000đ',
      status: 'unpaid',
    },
    {
      _id: '2',
      name: 'Trần Thị Tèo',
      class: 'Lớp 2 - Tiếng Anh',
      amount: '600,000đ',
      status: 'paid',
    },
    {
      _id: '3',
      name: 'Lê Văn Luyện',
      class: 'Lớp 1 - Toán Cơ Bản',
      amount: '500,000đ',
      status: 'unpaid',
    },
  ]

  const filteredRecords = records.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case 'status':
        return (
          <span className={item.status === 'paid' ? 'text-success font-medium' : 'text-error font-medium'}>
            {item.status === 'paid' ? translate('admin.paid') : translate('admin.unpaid')}
          </span>
        )
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            {item.status === 'unpaid' && (
              <MyButton color='success' size='sm' variant='flat' onClick={() => {}}>
                <CheckCircle className='w-4 h-4 mr-1' /> {translate('admin.markAsPaid')}
              </MyButton>
            )}
            {item.status === 'paid' && <span className='text-default-400 text-sm italic'>{translate('common.noData')}</span>}
          </div>
        )
      default:
        return item[columnKey]
    }
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{translate('admin.tuitionManagement')}</h1>
        <p className='text-default-500'>{translate('admin.tuitionManagementDesc')}</p>
      </div>

      <Card className='border-none shadow-md'>
        <CardBody className='p-6 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <MyInput
              className='md:max-w-md'
              placeholder={`${translate('common.search')}...`}
              startContent={<Search className='text-default-400' />}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />

            <Tabs
              aria-label='Filter status'
              color='primary'
              selectedKey={filterStatus}
              variant='bordered'
              onSelectionChange={(key: React.Key) => setFilterStatus(key as string)}
            >
              <Tab key='all' title={translate('admin.all')} />
              <Tab key='paid' title={translate('admin.paid')} />
              <Tab key='unpaid' title={translate('admin.unpaid')} />
            </Tabs>
          </div>

          <MyTable columns={columns} items={filteredRecords} renderCell={renderCell} />
        </CardBody>
      </Card>
    </div>
  )
}

export default TuitionManagement
