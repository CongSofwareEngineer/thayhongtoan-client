'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import InfoHome from './Component/InfoHome'
import SocialMedia from './Component/SocialMedia'

import { images } from '@/config/images'
import useLanguage from '@/hooks/useLanguage'
import MyButton from '@/components/MyButton'

function HomeScreen() {
  const { translate } = useLanguage()
  const router = useRouter()

  return (
    <main className='w-full bg-neutral-950 text-white'>
      <SocialMedia />

      <section className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <Image fill priority alt='banner' className='object-cover opacity-35 blur-[2px]' sizes='100vw' src={images.home.banner} />
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/90 to-neutral-950' />
          <div className='absolute -left-40 top-20 h-80 w-80 rounded-full bg-default/25 blur-3xl' />
          <div className='absolute -right-44 bottom-8 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
        </div>

        <div className='relative mx-auto max-w-7xl px-5 md:px-12'>
          <div className='grid min-h-[calc(100vh-56px)] grid-cols-1 items-center gap-12 py-14 lg:grid-cols-2 lg:py-20'>
            <div className='flex flex-col gap-5'>
              <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur'>
                <span className='h-2 w-2 rounded-full bg-primary' />
                Giáo dục chất lượng cho con bạn
              </div>

              <h1 className='text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl'>
                Nuôi dưỡng
                <br />
                <span className='text-default'>tương lai sáng</span>
              </h1>
              <p className='max-w-xl text-base text-white/70 sm:text-lg'>
                Với hơn 10 năm kinh nghiệm, đồng hành cùng các em nhỏ 5–12 tuổi phát triển toàn diện qua các lớp luyện chữ và toán tư duy.
              </p>

              <div className='flex flex-wrap gap-3'>
                <MyButton
                  className='min-w-44 font-semibold'
                  color='primary'
                  radius='sm'
                  size='lg'
                  variant='solid'
                  onPress={() => router.push('/class')}
                >
                  Xem lớp học →
                </MyButton>
                <MyButton
                  className='min-w-44 border-white/20 text-white'
                  color='default'
                  radius='sm'
                  size='lg'
                  variant='bordered'
                  onPress={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Tìm hiểu thêm
                </MyButton>
              </div>
            </div>

            <div className='flex items-center justify-center lg:justify-end'>
              <div className='relative w-full max-w-xl'>
                <div className='absolute -bottom-6 -right-6 h-[92%] w-[92%] rounded-[28px] bg-default/20' />

                <div className='relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur'>
                  <div className='relative aspect-[4/3] w-full'>
                    <Image fill alt='hero' className='object-cover' sizes='(max-width: 1024px) 100vw, 560px' src={images.home.banner2} />
                    <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent' />
                  </div>

                  <div className='absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/60 px-4 py-3 backdrop-blur'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-default/20 text-default'>
                      <svg className='size-6' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                        <path
                          d='M4.5 19.5V6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75V19.5m-15 0h15m-15 0a2.25 2.25 0 0 0 2.25-2.25V6.75m12.75 12.75a2.25 2.25 0 0 1-2.25-2.25V6.75'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <div className='leading-tight'>
                      <div className='text-lg font-extrabold'>500+</div>
                      <div className='text-xs text-white/70'>Học sinh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='border-y border-white/5 bg-neutral-950/60'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-3 md:px-12'>
          {[
            { value: '500+', label: 'Học sinh đã dạy' },
            { value: '10+', label: 'Năm kinh nghiệm' },
            { value: '98%', label: 'Phụ huynh hài lòng' },
          ].map((s) => (
            <div key={s.value} className='text-center'>
              <div className='text-3xl font-extrabold text-default sm:text-4xl'>{s.value}</div>
              <div className='mt-1 text-sm text-white/60'>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className='mx-auto w-full max-w-7xl px-5 py-14 md:px-12 md:py-20'>
        <InfoHome />
      </section>

      <section className='mx-auto w-full max-w-7xl px-5 pb-16 md:px-12 md:pb-24'>
        <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-default/60 px-6 py-14 shadow-2xl md:px-12'>
          <div className='absolute inset-0 bg-gradient-to-r from-default/35 via-default/70 to-default/35' />
          <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl' />
          <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
            <h3 className='text-3xl font-extrabold sm:text-4xl'>Sẵn sàng cho hành trình mới?</h3>
            <p className='mt-3 text-sm text-white/80 sm:text-base'>Đăng ký ngay hôm nay để con bạn được trải nghiệm phương pháp học tập hiệu quả.</p>
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
      </section>
    </main>
  )
}

export default HomeScreen
