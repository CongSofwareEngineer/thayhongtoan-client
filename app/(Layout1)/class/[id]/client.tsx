'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import useGetClass from '@/hooks/react-query/useGetClass'
import { ITeacher } from '@/services/API/Teacher/type'
import { numberWithCommas } from '@/utils/functions'
import { ClockIcon } from '@/components/Icons/Clock'
import { LocationIcon } from '@/components/Icons/Location'
import { CheckBadgeIcon } from '@/components/Icons/CheckBadge'
import { SparklesIcon } from '@/components/Icons/Sparkles'
import { showNotificationSuccess } from '@/utils/notification'

const ClassDetailClient = ({ id }: { id: string }) => {
  const router = useRouter()
  const { data: classes = [], isLoading } = useGetClass({ _id: id } as any)
  const classItem = classes.find((c) => c._id === id)
  const teacherName = (classItem?.idTeacher as ITeacher)?.name || 'Thầy Hồng'

  const reviews = [
    { name: 'Nguyễn Văn A', content: 'Thầy dạy rất tận tâm, con mình đã tiến bộ rất nhiều sau 1 tháng.', rating: 5 },
    { name: 'Trần Thị B', content: 'Lớp học vui vẻ, phương pháp dạy dễ hiểu.', rating: 4 },
    { name: 'Lê Văn C', content: 'Môi trường học tập tốt, trang thiết bị hiện đại.', rating: 5 },
  ]

  const handleRegister = (_data: any) => {
    showNotificationSuccess('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn soon.')
    router.push('/register?idClass=' + id)
  }

  if (isLoading) return <div className='p-20 text-center'>Đang tải...</div>
  if (!classItem) return <div className='p-20 text-center'>Không tìm thấy lớp học.</div>

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section */}
      <section className='relative h-[500px] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0'>
          <MyImage
            alt={classItem.name}
            className='w-full h-full object-cover brightness-[0.4]'
            src='https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent' />
        </div>

        <div className='relative z-10 text-center px-4 max-w-4xl'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 backdrop-blur-sm'>
            <span className='text-sm text-yellow-600 font-bold uppercase tracking-widest'>Lớp học tiêu biểu</span>
          </div>
          <h1 className='text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl'>{classItem.name}</h1>
          <p className='text-xl md:text-2xl text-gray-200 font-medium italic mb-10'>
            &quot;Khai phá tiềm năng, vững bước tương lai&quot; - Slogan lớp học của Thầy Hồng
          </p>
          <MyButton
            className='px-12 py-7 text-xl font-extrabold shadow-2xl'
            color='primary'
            onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ĐĂNG KÝ NGAY
          </MyButton>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-20'>
        <div className='grid lg:grid-cols-3 gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-16'>
            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-8 border-l-8 border-primary pl-6'>Nội Dung Khóa Học</h2>
              <div className='prose prose-lg text-gray-600 max-w-none'>
                <p className='mb-6'>
                  {classItem.note ||
                    'Khóa học được thiết kế đặc biệt nhằm giúp các em học sinh nắm vững kiến thức nền tảng và phát triển tư duy sáng tạo.'}
                </p>
                <div className='grid sm:grid-cols-2 gap-4 mt-8'>
                  {[
                    'Học tập qua các ví dụ thực tế',
                    'Môi trường tương tác năng động',
                    'Đội ngũ giáo viên giàu kinh nghiệm',
                    'Hệ thống bài tập đa dạng',
                    'Theo dõi sát sao tiến độ học tập',
                    'Hỗ trợ giải đáp thắc mắc 24/7',
                  ].map((text, i) => (
                    <div key={i} className='flex items-center gap-3 bg-gray-50 p-4 rounded-xl'>
                      <CheckBadgeIcon className='text-green-500 size-6 flex-shrink-0' />
                      <span className='font-medium'>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-8 border-l-8 border-primary pl-6'>Phản Hồi Từ Phụ Huynh</h2>
              <div className='grid gap-6'>
                {reviews.map((review, i) => (
                  <div key={i} className='bg-gray-50 p-8 rounded-3xl border border-gray-100'>
                    <div className='flex items-center gap-1 mb-4 text-yellow-500'>
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <SparklesIcon key={j} className='size-5 fill-current' />
                      ))}
                    </div>
                    <p className='text-gray-700 italic text-lg mb-6'>&quot;{review.content}&quot;</p>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary'>
                        {review.name.charAt(0)}
                      </div>
                      <span className='font-bold text-gray-900'>{review.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info & Form */}
          <div className='space-y-8'>
            <div className='bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sticky top-24'>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>Thông Tin Lớp Học</h3>
              <div className='space-y-6'>
                <div className='flex items-center gap-4 border-b border-gray-50 pb-4'>
                  <div className='w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600'>
                    <ClockIcon />
                  </div>
                  <div>
                    <p className='text-gray-500 text-xs font-bold uppercase'>Lịch học</p>
                    <p className='font-bold'>{classItem.attributes?.time || 'Liên hệ để biết thêm'}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 border-b border-gray-50 pb-4'>
                  <div className='w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600'>
                    <span className='text-2xl'>💰</span>
                  </div>
                  <div>
                    <p className='text-gray-500 text-xs font-bold uppercase'>Học phí</p>
                    <p className='font-extrabold text-2xl text-primary'>{numberWithCommas(classItem.price, true)} đ/tháng</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600'>
                    <LocationIcon />
                  </div>
                  <div>
                    <p className='text-gray-500 text-xs font-bold uppercase'>Giảng viên</p>
                    <p className='font-bold'>{teacherName}</p>
                  </div>
                </div>
              </div>

              <div className='mt-12 pt-12 border-t border-gray-100' id='register-form'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Đăng Ký Tư Vấn</h3>
                <MyForm className='flex flex-col gap-4' onSubmit={handleRegister}>
                  <MyInput required label='Họ tên phụ huynh' name='parentName' placeholder='Nhập họ tên' />
                  <MyInput required label='Số điện thoại' name='phone' placeholder='Nhập SĐT' type='tel' />
                  <MyInput required label='Tên và tuổi của bé' name='studentInfo' placeholder='VD: Bé Nam, 7 tuổi' />
                  <MyButton className='w-full py-6 mt-4 font-bold text-lg' color='primary' type='submit'>
                    GỬI ĐĂNG KÝ
                  </MyButton>
                </MyForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassDetailClient
