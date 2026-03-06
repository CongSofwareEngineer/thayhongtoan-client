'use client'

import React from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyForm from '@/components/MyForm'
import useModal from '@/hooks/useModal'
import { PhoneIcon } from '@/components/Icons/Phone'
import { LocationIcon } from '@/components/Icons/Location'
import { ClockIcon } from '@/components/Icons/Clock'

const LaundryClient = () => {
  const { openModal, closeModal } = useModal()

  const branches = [
    {
      name: 'Chi nhánh 1',
      address: '123 Đường ABC, Quận 1, TP. HCM',
      phone: '0123 456 789',
      hours: '07:00 - 21:00',
    },
    {
      name: 'Chi nhánh 2',
      address: '456 Đường XYZ, Quận 7, TP. HCM',
      phone: '0987 654 321',
      hours: '07:00 - 21:00',
    },
  ]

  const handleBooking = (_data: any) => {
    // Handle booking logic here
    alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
    closeModal()
  }

  const openBookingModal = () => {
    openModal({
      title: 'Đặt lịch giặt ủi',
      children: (
        <MyForm className='flex w-full flex-col gap-4' onSubmit={handleBooking}>
          <MyInput required label='Họ và tên' name='fullName' placeholder='Nhập họ và tên' />
          <MyInput required label='Số điện thoại' name='phone' placeholder='Nhập số điện thoại' type='tel' />
          <MyInput required label='Địa chỉ lấy hàng' name='pickupAddress' placeholder='Nhập địa chỉ lấy hàng' />
          <MyInput required label='Địa chỉ giao hàng' name='deliveryAddress' placeholder='Nhập địa chỉ giao hàng' />
          <MyInput label='Khối lượng dự kiến (kg)' name='weight' placeholder='Nhập khối lượng dự kiến' type='number' />
          <MyInput label='Ghi chú' name='note' placeholder='Ghi chú thêm (nếu có)' />
          <div className='flex justify-end gap-2 mt-4'>
            <MyButton color='default' variant='flat' onPress={() => closeModal()}>
              Hủy
            </MyButton>
            <MyButton color='primary' type='submit'>
              Xác nhận đặt lịch
            </MyButton>
          </div>
        </MyForm>
      ),
    })
  }

  return (
    <div className='w-full bg-[#f8fafc] min-h-screen pb-20'>
      {/* Hero Section */}
      <section className='relative h-[400px] flex items-center justify-center overflow-hidden'>
        {/* <div className='absolute inset-0 z-0'>
          <MyImage
            alt='Laundry Hero'
            className='w-full h-full object-cover brightness-[0.4]'
            src='https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=2070'
          />
        </div> */}
        <div className='relative z-10 text-center px-4'>
          <h1 className='text-4xl md:text-6xl font-bold  mb-4'>Dịch Vụ Giặt ủi Thay Hồng Toàn</h1>
          <p className='text-xl  mb-8 max-w-2xl mx-auto'>
            Chuyên nghiệp - Tận tâm - Nhanh chóng. Chúng tôi chăm sóc quần áo của bạn như chính người thân trong gia đình.
          </p>
          <MyButton className='px-10 py-6 text-lg font-bold shadow-xl' color='primary' size='lg' onPress={openBookingModal}>
            Đặt Lịch Ngay
          </MyButton>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-1'>
        {/* Pricing Section */}
        <section className='grid md:grid-cols-2 gap-8 mb-20'>
          <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center'>
                <span className='text-2xl font-bold text-primary'>1kg</span>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900'>Giá Giặt Lẻ</h3>
                <p className='text-gray-500'>Dành cho mọi loại quần áo</p>
              </div>
            </div>
            <div className='text-5xl font-extrabold text-primary mb-6'>
              15.000đ <span className='text-lg font-medium text-gray-400'>/ kg</span>
            </div>
            <ul className='space-y-3 mb-8 text-gray-600'>
              <li className='flex items-center gap-2'>✓ Giặt sấy khô ráo</li>
              <li className='flex items-center gap-2'>✓ Xả vải thơm mát</li>
              <li className='flex items-center gap-2'>✓ Gấp xếp gọn gàng</li>
            </ul>
          </div>

          <div className='bg-white p-8 rounded-3xl shadow-xl border-2 border-primary transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden'>
            <div className='absolute top-0 right-0 bg-primary text-white px-6 py-1 rounded-bl-2xl text-sm font-bold'>ƯU ĐÃI LỚN</div>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center'>
                <span className='text-2xl font-bold text-primary'>15k+</span>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900'>Combo Ưu Đãi</h3>
                <p className='text-gray-500'>Khi giặt từ 15kg trở lên</p>
              </div>
            </div>
            <div className='text-5xl font-extrabold text-primary mb-6'>
              12.000đ <span className='text-lg font-medium text-gray-400'>/ kg</span>
            </div>
            <ul className='space-y-3 mb-8 text-gray-600'>
              <li className='flex items-center gap-2 font-bold text-green-600'>✓ Tiết kiệm 3.000đ/kg</li>
              <li className='flex items-center gap-2'>✓ Miễn phí giao nhận tận nơi (bán kính 3km)</li>
              <li className='flex items-center gap-2'>✓ Ưu tiên xử lý nhanh</li>
            </ul>
          </div>
        </section>

        {/* Branches Section */}
        <section className='mb-20'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-12'>Hệ Thống Cửa Hàng</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {branches.map((branch, index) => (
              <div key={index} className='bg-white p-6 rounded-2xl shadow-md border border-gray-50 flex gap-6 items-start'>
                <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0'>
                  <LocationIcon className='text-blue-600 size-6' />
                </div>
                <div className='flex-1'>
                  <h4 className='text-xl font-bold text-gray-900 mb-2'>{branch.name}</h4>
                  <p className='text-gray-600 mb-4'>{branch.address}</p>
                  <div className='flex flex-wrap gap-6 text-sm text-gray-500'>
                    <div className='flex items-center gap-2'>
                      <PhoneIcon className='w-4 h-4' />
                      {branch.phone}
                    </div>
                    <div className='flex items-center gap-2'>
                      <ClockIcon className='w-4 h-4' />
                      {branch.hours}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl' />
          <div className='absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl' />
          <h3 className='text-3xl md:text-4xl font-bold mb-6'>Bạn đang cần giặt đồ gấp?</h3>
          <p className='text-blue-100 mb-10 max-w-xl mx-auto'>
            Đừng quá lo lắng, hãy để chúng tôi giúp bạn. Đội ngũ giao nhận sẽ có mặt trong vòng 30 - 60 phút.
          </p>
          <MyButton className='bg-white text-blue-600 px-12 py-7 rounded-2xl font-extrabold text-xl hover:bg-blue-50' onPress={openBookingModal}>
            ĐẶT LỊCH NGAY
          </MyButton>
        </section>
      </div>
    </div>
  )
}

export default LaundryClient
