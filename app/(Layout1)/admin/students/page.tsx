'use client'
import React, { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Search, Trash, User, CheckCircle, Star } from 'lucide-react'

import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyModal from '@/components/MyModal'
import useModal from '@/hooks/useModal'
import useLanguage from '@/hooks/useLanguage'

const StudentManagement = () => {
  const { openModal } = useModal()
  const { translate } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const columns = [
    { key: 'name', label: translate('admin.student').toUpperCase() },
    { key: 'class', label: translate('admin.class').toUpperCase() },
    { key: 'phone', label: translate('admin.phone').toUpperCase() },
    { key: 'status', label: translate('admin.status').toUpperCase() },
    { key: 'actions', label: translate('admin.actions').toUpperCase() },
  ]

  const students = [
    {
      _id: '1',
      name: 'Nguyễn Văn Tí',
      class: 'Lớp 1 - Toán Cơ Bản',
      phone: '0901234567',
      status: 'unpaid',
      parent: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, Hà Tiên',
      },
    },
    {
      _id: '2',
      name: 'Trần Thị Tèo',
      class: 'Lớp 2 - Tiếng Anh',
      phone: '0907654321',
      status: 'paid',
      parent: {
        name: 'Trần Thị B',
        phone: '0907654321',
        address: '456 Đường XYZ, Hà Tiên',
      },
    },
  ]

  const handleViewParent = (student: any) => {
    openModal({
      title: `${translate('admin.parentInfo')} - ${student.name}`,
      children: (
        <div className='flex flex-col gap-4 py-4'>
          <div className='grid grid-cols-2 gap-2'>
            <p className='text-default-500'>{translate('admin.parentName')}:</p>
            <p className='font-bold'>{student.parent.name}</p>
            <p className='text-default-500'>{translate('admin.phone')}:</p>
            <p className='font-bold'>{student.parent.phone}</p>
            <p className='text-default-500'>{translate('admin.address')}:</p>
            <p className='font-bold'>{student.parent.address}</p>
          </div>
        </div>
      ),
    })
  }

  const handleEvaluation = (student: any) => {
    openModal({
      title: `${translate('admin.evaluation')} - ${student.name}`,
      children: (
        <div className='flex flex-col gap-4 py-4'>
          <MyInput label={translate('admin.evaluationContent')} placeholder={translate('placeholder.enterContent')} />
          <MyButton color='primary' onClick={() => {}}>
            {translate('admin.sendEvaluation')}
          </MyButton>
        </div>
      ),
    })
  }

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-2 cursor-pointer hover:text-primary transition-colors' onClick={() => handleViewParent(item)}>
            <User className='w-4 h-4' />
            <span>{item.name}</span>
          </div>
        )
      case 'status':
        return (
          <span className={item.status === 'paid' ? 'text-success font-medium' : 'text-error font-medium'}>
            {item.status === 'paid' ? translate('admin.paid') : translate('admin.unpaid')}
          </span>
        )
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <MyButton color='success' size='sm' variant='flat' onClick={() => {}}>
              <CheckCircle className='w-4 h-4 mr-1' /> {translate('admin.paid')}
            </MyButton>
            <MyButton color='warning' size='sm' variant='flat' onClick={() => handleEvaluation(item)}>
              <Star className='w-4 h-4 mr-1' /> {translate('admin.evaluation')}
            </MyButton>
            <MyButton color='error' size='sm' variant='flat'>
              <Trash className='w-4 h-4 mr-1' /> {translate('common.delete')}
            </MyButton>
          </div>
        )
      default:
        return item[columnKey]
    }
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{translate('admin.studentManagement')}</h1>
        <p className='text-default-500'>{translate('admin.studentManagementDesc')}</p>
      </div>

      <Card className='border-none shadow-md'>
        <CardBody className='p-6 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <MyInput
              className='md:max-w-md'
              placeholder={`${translate('common.search')}...`}
              startContent={<Search className='text-default-400' />}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          </div>

          <MyTable columns={columns} items={students} renderCell={renderCell} />
        </CardBody>
      </Card>
      <MyModal />
    </div>
  )
}

export default StudentManagement
