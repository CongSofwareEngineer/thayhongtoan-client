'use client'
import React, { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Search, Trash, User } from 'lucide-react'

import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyModal from '@/components/MyModal'
import useModal from '@/hooks/useModal'
import useLanguage from '@/hooks/useLanguage'

const ParentManagement = () => {
  const { openModal } = useModal()
  const { translate } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const columns = [
    { key: 'name', label: translate('admin.parentName').toUpperCase() },
    { key: 'phone', label: translate('admin.phone').toUpperCase() },
    { key: 'address', label: translate('admin.address').toUpperCase() },
    { key: 'studentCount', label: translate('admin.studentCount').toUpperCase() },
    { key: 'actions', label: translate('admin.actions').toUpperCase() },
  ]

  const parents = [
    {
      _id: '1',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC, Hà Tiên',
      studentCount: 1,
      students: [{ name: 'Nguyễn Văn Tí', class: 'Lớp 1 - Toán Cơ Bản' }],
    },
    {
      _id: '2',
      name: 'Trần Thị B',
      phone: '0907654321',
      address: '456 Đường XYZ, Hà Tiên',
      studentCount: 1,
      students: [{ name: 'Trần Thị Tèo', class: 'Lớp 2 - Tiếng Anh' }],
    },
  ]

  const handleViewStudents = (parent: any) => {
    openModal({
      title: `${translate('admin.listChildren')} - ${parent.name}`,
      children: (
        <div className='flex flex-col gap-4 py-4'>
          {parent.students.map((student: any, index: number) => (
            <div key={index} className='p-4 bg-default-50 rounded-xl flex justify-between items-center'>
              <div>
                <p className='font-bold'>{student.name}</p>
                <p className='text-sm text-default-500'>{student.class}</p>
              </div>
              <User className='w-5 h-5 text-primary' />
            </div>
          ))}
        </div>
      ),
    })
  }

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-2 cursor-pointer hover:text-primary transition-colors' onClick={() => handleViewStudents(item)}>
            <User className='w-4 h-4' />
            <span>{item.name}</span>
          </div>
        )
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
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
        <h1 className='text-3xl font-bold'>{translate('admin.parentManagement')}</h1>
        <p className='text-default-500'>{translate('admin.parentManagementDesc')}</p>
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

          <MyTable columns={columns} items={parents} renderCell={renderCell} />
        </CardBody>
      </Card>
      <MyModal />
    </div>
  )
}

export default ParentManagement
