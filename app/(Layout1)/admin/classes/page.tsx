'use client'
import React, { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Plus, Search, Trash, Eye, MessageSquare } from 'lucide-react'

import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyModal from '@/components/MyModal'
import useModal from '@/hooks/useModal'
import MyForm from '@/components/MyForm'
import useLanguage from '@/hooks/useLanguage'

const ClassManagement = () => {
  const { openModal } = useModal()
  const { translate } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const columns = [
    { key: 'name', label: translate('admin.className').toUpperCase() },
    { key: 'price', label: translate('admin.price').toUpperCase() },
    { key: 'sessions', label: translate('admin.sessions').toUpperCase() },
    { key: 'schedule', label: translate('admin.schedule').toUpperCase() },
    { key: 'actions', label: translate('admin.actions').toUpperCase() },
  ]

  const classes = [
    {
      _id: '1',
      name: 'Lớp 1 - Toán Cơ Bản',
      price: '500,000đ',
      sessions: 12,
      time: '18:00 - 20:00',
      schedule: 'Thứ 2, Thứ 4, Thứ 6',
      media: {
        images: ['https://heroui.com/images/hero-card-complete.jpeg'],
        video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    },
  ]

  const handleAddClass = () => {
    openModal({
      title: translate('admin.newClass'),
      size: '2xl',
      children: (
        <MyForm className='flex flex-col gap-4 py-4'>
          <MyInput label={translate('admin.className')} placeholder={translate('placeholder.enterContent')} />
          <div className='grid grid-cols-2 gap-4'>
            <MyInput label={translate('admin.price')} placeholder={translate('placeholder.enterContent')} />
            <MyInput label={translate('admin.sessions')} placeholder={translate('placeholder.enterContent')} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <MyInput label={translate('admin.studyTime')} placeholder='Ví dụ: 18:00 - 20:00' />
            <MyInput label={translate('admin.schedule')} placeholder='Ví dụ: Thứ 2, 4, 6' />
          </div>
          <MyInput label={translate('admin.videoLink')} placeholder={translate('placeholder.enterContent')} />
          <MyInput label={translate('admin.imageList')} placeholder={translate('placeholder.enterContent')} />
          <MyButton className='mt-4' color='primary' type='submit'>
            {translate('admin.saveClass')}
          </MyButton>
        </MyForm>
      ),
    })
  }

  const handleViewComments = (classItem: any) => {
    openModal({
      title: `${translate('admin.parentComment')} - ${classItem.name}`,
      size: '3xl',
      children: (
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col gap-2 p-4 bg-default-50 rounded-xl'>
            <p className='font-bold'>Nguyễn Văn A (Phụ huynh bé Tí)</p>
            <p className='text-default-600'>Thầy dạy rất tận tâm, bé nhà tôi tiến bộ nhiều.</p>
          </div>
          <div className='flex flex-col gap-2 p-4 bg-default-50 rounded-xl'>
            <p className='font-bold'>Trần Thị B (Phụ huynh bé Tèo)</p>
            <p className='text-default-600'>Lớp học vui vẻ, giáo trình dễ hiểu.</p>
          </div>
        </div>
      ),
    })
  }

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <MyButton color='primary' size='sm' variant='flat' onClick={() => handleViewComments(item)}>
              <MessageSquare className='w-4 h-4 mr-1' /> {translate('common.view')}
            </MyButton>
            <MyButton color='secondary' size='sm' variant='flat'>
              <Eye className='w-4 h-4 mr-1' /> {translate('common.edit')}
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
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold'>{translate('admin.classManagement')}</h1>
          <p className='text-default-500'>{translate('header.admin.class')}</p>
        </div>
        <MyButton className='font-bold' color='primary' onClick={handleAddClass}>
          <Plus className='w-5 h-5 mr-2' /> {translate('admin.addClass')}
        </MyButton>
      </div>

      <Card className='border-none shadow-md'>
        <CardBody className='p-6 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <MyInput
              className='md:max-w-xs'
              placeholder={`${translate('common.search')}...`}
              startContent={<Search className='text-default-400' />}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          </div>

          <MyTable columns={columns} items={classes} renderCell={renderCell} />
        </CardBody>
      </Card>
      <MyModal />
    </div>
  )
}

export default ClassManagement
