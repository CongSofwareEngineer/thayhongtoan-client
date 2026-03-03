'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import InfoHome from './Component/InfoHome'
import SocialMedia from './Component/SocialMedia'

import useLanguage from '@/hooks/useLanguage'
import MyButton from '@/components/MyButton'
import { ArrowDownIcon } from '@/components/Icons/ArrowDown'
import { ClassIcon } from '@/components/Icons/Class'
import MyImage from '@/components/MyImage'

function HomeScreen() {
  const { translate } = useLanguage()
  const router = useRouter()

  return (
    <section className='w-full  text-gray-900'>
      <SocialMedia />

      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#22C55E]/10 via-transparent to-[#3B82F6]/10' />
        <div className='absolute top-20 right-10 w-72 h-72 bg-[#22C55E]/15 rounded-full blur-3xl' />
        <div className='absolute bottom-10 left-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl' />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 mb-6'>
                {/* <Star className="w-4 h-4 text-[#F59E0B]" /> */}
                <span className='text-sm text-[#16A34A] font-medium'>Giáo dục chất lượng cho con bạn</span>
              </div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2332] leading-tight mb-6'>
                Nuôi dưỡng
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#3B82F6]'>tương lai sáng</span>
              </h1>

              <p className='text-lg text-[#64748B] mb-8 max-w-lg'>
                Với hơn 10 năm kinh nghiệm, thầy Minh đồng hành cùng các em nhỏ từ 5-12 tuổi phát triển toàn diện qua các lớp luyện chữ và toán tư
                duy.
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/class'>
                  <MyButton className='w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-8' size='lg'>
                    Xem lớp học
                    <ArrowDownIcon className='w-5 h-5 ml-2' />
                  </MyButton>
                </Link>
                <Link href='/about'>
                  <MyButton className='w-full sm:w-auto border-[#E2E8F0] text-[#1A2332] hover:bg-[#F0FDF4]' size='lg'>
                    Tìm hiểu thêm
                  </MyButton>
                </Link>
              </div>
            </div>

            <div className='relative hidden lg:block'>
              <div className='relative w-full aspect-square max-w-md mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#22C55E] to-[#3B82F6] rounded-3xl transform rotate-6 opacity-20' />
                <div className='absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-lg'>
                  <MyImage
                    alt='Education'
                    className='w-full h-full object-cover'
                    src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent' />
                </div>

                {/* Floating Card */}
                <div className='absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#E2E8F0]'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-[#22C55E]/15 flex items-center justify-center'>
                      <ClassIcon className='w-6 h-6 text-[#22C55E]' />
                    </div>
                    <div>
                      <p className='text-2xl font-bold text-[#1A2332]'>500+</p>
                      <p className='text-sm text-[#64748B]'>Học sinh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='border-y border-black/5 bg-white'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-3 md:px-12'>
          {[
            { value: '500+', label: 'Học sinh đã dạy' },
            { value: '10+', label: 'Năm kinh nghiệm' },
            { value: '98%', label: 'Phụ huynh hài lòng' },
          ].map((s) => (
            <div key={s.value} className='text-center'>
              <div className='text-3xl font-extrabold text-default sm:text-4xl'>{s.value}</div>
              <div className='mt-1 text-sm text-gray-500'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='mx-auto w-full max-w-7xl px-5 py-14 md:px-12 md:py-20'>
        <InfoHome />
      </div>

      <div className='mx-auto w-full max-w-7xl px-5 pb-16 md:px-12 md:pb-24'>
        <div className='relative overflow-hidden rounded-3xl border border-black/5 bg-default/10 px-6 py-14 shadow-2xl md:px-12'>
          <div className='absolute inset-0 bg-gradient-to-r from-default/5 via-default/20 to-default/5' />
          <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
          <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
            <h3 className='text-3xl font-extrabold sm:text-4xl text-gray-900'>Sẵn sàng cho hành trình mới?</h3>
            <p className='mt-3 text-sm text-gray-600 sm:text-base'>Đăng ký ngay hôm nay để con bạn được trải nghiệm phương pháp học tập hiệu quả.</p>
            <MyButton
              className='mt-7 min-w-44 font-semibold'
              color='primary'
              radius='sm'
              size='lg'
              variant='solid'
              onPress={() => router.push('/register?idClass=697ece7d7e900925609a2acb')}
            >
              {translate('register.registerNow')} →
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeScreen
