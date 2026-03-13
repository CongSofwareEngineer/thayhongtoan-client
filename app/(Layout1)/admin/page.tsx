'use client'
import React from 'react'
import { Card, CardBody } from '@heroui/card'
import { Users, BookOpen, DollarSign } from 'lucide-react'

import useLanguage from '@/hooks/useLanguage'

const AdminDashboard = () => {
  const { translate } = useLanguage()

  const stats = [
    {
      title: translate('admin.studentActive'),
      value: '120',
      icon: <Users className='w-8 h-8 text-primary' />,
      color: 'bg-primary/10',
    },
    {
      title: translate('admin.classOpening'),
      value: '15',
      icon: <BookOpen className='w-8 h-8 text-success' />,
      color: 'bg-success/10',
    },
    {
      title: translate('admin.revenue'),
      value: '25,000,000đ',
      icon: <DollarSign className='w-8 h-8 text-warning' />,
      color: 'bg-warning/10',
    },
  ]

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{translate('admin.overview')}</h1>
        <p className='text-default-500'>{translate('admin.welcomeAdmin')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {stats.map((stat, index) => (
          <Card key={index} className='border-none shadow-md'>
            <CardBody className='flex flex-row items-center gap-6 p-6'>
              <div className={`p-4 rounded-2xl ${stat.color}`}>{stat.icon}</div>
              <div className='flex flex-col'>
                <p className='text-sm text-default-500 font-medium'>{stat.title}</p>
                <p className='text-2xl font-bold'>{stat.value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
