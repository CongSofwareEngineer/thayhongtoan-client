'use client'
import React, { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import { PhoneIcon } from '@/components/Icons/Phone'
import { SearchIcon } from '@/components/Icons/Search'
import useGetParent from '@/hooks/react-query/useGetParent'
import useGetPayment from '@/hooks/react-query/useGetPayment'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import { IClass } from '@/services/API/Class/type'
import { IStudent } from '@/services/API/Student/type'
import { numberWithCommas } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

const StudentTrackingClient = () => {
  const [phone, setPhone] = useState('')
  const [searchPhone, setSearchPhone] = useState('')

  const { data: parents = [], isLoading: isLoadingParent } = useGetParent({ phone: searchPhone })
  const parent = parents[0]

  const { data: students = [], isLoading: isLoadingStudents } = useGetStudent({
    idParent: parent?._id,
  } as any)

  const { data: payments = [] } = useGetPayment({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  } as any)

  const handleSearch = () => {
    setSearchPhone(phone)
  }

  const getStudentPayment = (studentId: string) => {
    return payments.find((p) => {
      const idS = typeof p.idStudent === 'string' ? p.idStudent : (p.idStudent as any)?._id

      return idS === studentId
    })
  }

  return (
    <div className='w-full bg-[#f8fafc] min-h-screen py-10'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-3xl shadow-xl p-8 mb-10 text-center border border-blue-50'>
          <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>Tra Cứu Thông Tin Học Sinh</h1>
          <p className='text-gray-500 mb-8'>Nhập số điện thoại phụ huynh để xem tình hình học tập của con</p>

          <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
            <MyInput
              className='flex-1'
              placeholder='Nhập số điện thoại...'
              startContent={<SearchIcon className='text-gray-400' />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <MyButton className='px-8 font-bold' color='primary' isLoading={isLoadingParent || isLoadingStudents} onClick={handleSearch}>
              Tra cứu
            </MyButton>
          </div>
        </div>

        {searchPhone && !isLoadingParent && !parent && (
          <div className='text-center py-10 bg-white rounded-3xl shadow-sm border border-gray-100'>
            <p className='text-gray-500 italic'>Không tìm thấy thông tin phụ huynh với số điện thoại này.</p>
          </div>
        )}

        {parent && (
          <div className='space-y-6'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg'>
              <h2 className='text-xl font-bold mb-4'>Thông tin phụ huynh</h2>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
                    <span className='font-bold'>H</span>
                  </div>
                  <div>
                    <p className='text-blue-100 text-xs uppercase tracking-wider'>Họ và tên</p>
                    <p className='font-semibold'>{parent.name}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
                    <PhoneIcon className='size-5' />
                  </div>
                  <div>
                    <p className='text-blue-100 text-xs uppercase tracking-wider'>Số điện thoại</p>
                    <p className='font-semibold'>{parent.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className='text-2xl font-bold text-gray-900 mt-10 mb-6 px-2 text-center underline decoration-primary decoration-4 underline-offset-8 uppercase'>
              Danh sách học sinh
            </h3>

            <div className='grid gap-6'>
              {students.map((student: IStudent) => {
                const studentClass = student.idClass as IClass
                const payment = getStudentPayment(student._id!)

                return (
                  <div
                    key={student._id}
                    className='bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow'
                  >
                    <div className='p-6 md:p-8'>
                      <div className='flex flex-col md:flex-row gap-6'>
                        <div className='w-24 h-24 rounded-2xl bg-gray-100 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-gray-400'>
                          {student.name.charAt(0)}
                        </div>

                        <div className='flex-1'>
                          <div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
                            <div>
                              <h4 className='text-2xl font-bold text-gray-900'>{student.name}</h4>
                              <p className='text-gray-500 font-medium'>{student.age} tuổi</p>
                            </div>
                            <div
                              className={cn(
                                'px-4 py-1.5 rounded-full text-sm font-bold',
                                payment?.status === 'paid'
                                  ? 'bg-green-100 text-green-700'
                                  : payment?.status === 'partial'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                              )}
                            >
                              {payment?.status === 'paid'
                                ? 'Đã đóng học phí'
                                : payment?.status === 'partial'
                                  ? 'Còn thiếu học phí'
                                  : 'Chưa đóng học phí'}
                            </div>
                          </div>

                          <div className='grid sm:grid-cols-2 gap-6 mt-6'>
                            <div className='bg-blue-50/50 p-4 rounded-2xl'>
                              <p className='text-blue-600 text-xs font-bold uppercase mb-2'>Lớp học hiện tại</p>
                              <p className='font-bold text-gray-900'>{studentClass?.name || 'Chưa xếp lớp'}</p>
                              <p className='text-sm text-gray-500 mt-1'>{studentClass?.attributes?.time}</p>
                              <p className='text-sm font-bold text-primary mt-2'>{numberWithCommas(studentClass?.price || 0, true)} đ/tháng</p>
                            </div>

                            <div className='bg-amber-50/50 p-4 rounded-2xl'>
                              <p className='text-amber-600 text-xs font-bold uppercase mb-2'>Ghi chú từ thầy giáo</p>
                              <p className='text-gray-700 text-sm italic'>
                                {payment?.note || 'Hiện chưa có ghi chú cụ thể về tình hình học tập tháng này.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {!isLoadingStudents && students.length === 0 && (
                <div className='text-center py-20 bg-white rounded-3xl shadow-sm'>
                  <p className='text-gray-400 italic'>Hiện không có học sinh nào được đăng ký dưới tên phụ huynh này.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentTrackingClient
