'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import ClassCard from '@/components/ClassCard'
import CommentSection from '@/components/CommentSection'
import Section, { SectionHeading } from '@/components/Section'
import { AcademicIcon } from '@/components/Icons/Academic'
import { ArrowRightIcon } from '@/components/Icons/ArrowRight'
import { CheckBadgeIcon } from '@/components/Icons/CheckBadge'
import { ChartBarIcon } from '@/components/Icons/ChartBar'
import { ChatIcon } from '@/components/Icons/Chat'
import { HeartIcon } from '@/components/Icons/Heart'
import { MoneyIcon } from '@/components/Icons/Money'
import { ShieldIcon } from '@/components/Icons/Shield'
import { SparklesIcon } from '@/components/Icons/Sparkles'
import { StarIcon } from '@/components/Icons/Star'
import { UsersIcon } from '@/components/Icons/Users'
import { DEMO_ACHIEVEMENTS } from '@/constants/demoData'
import { ROUTES } from '@/constants/routes'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'

const HomeScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { data: classes, isLoading } = useGetClassPublic({ limit: 6 })

  const reasons = [
    { icon: <UsersIcon />, title: translate('home.why1Title'), desc: translate('home.why1Desc') },
    { icon: <ChartBarIcon />, title: translate('home.why2Title'), desc: translate('home.why2Desc') },
    { icon: <ChatIcon />, title: translate('home.why3Title'), desc: translate('home.why3Desc') },
    { icon: <MoneyIcon />, title: translate('home.why4Title'), desc: translate('home.why4Desc') },
    { icon: <HeartIcon />, title: translate('home.why5Title'), desc: translate('home.why5Desc') },
    { icon: <ShieldIcon />, title: translate('home.why6Title'), desc: translate('home.why6Desc') },
  ]

  const steps = [
    { title: translate('home.step1Title'), desc: translate('home.step1Desc') },
    { title: translate('home.step2Title'), desc: translate('home.step2Desc') },
    { title: translate('home.step3Title'), desc: translate('home.step3Desc') },
    { title: translate('home.step4Title'), desc: translate('home.step4Desc') },
  ]

  const faqs = [
    { q: translate('faq.q1'), a: translate('faq.a1') },
    { q: translate('faq.q2'), a: translate('faq.a2') },
    { q: translate('faq.q3'), a: translate('faq.a3') },
    { q: translate('faq.q4'), a: translate('faq.a4') },
  ]

  return (
    <>
      {/* Hero */}
      <section className='relative w-full overflow-hidden bg-base-100'>
        <div className='pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-secondary/20 blur-3xl' />

        <div className='relative m-auto grid w-full max-w-[1550px] items-center gap-12 px-5 py-14 md:px-12 md:py-24 lg:grid-cols-2'>
          <div className='flex flex-col items-start'>
            <span className='badge badge-soft badge-primary gap-2 py-3 font-semibold'>
              <SparklesIcon className='size-4' />
              {translate('home.badge')}
            </span>

            <h1 className='mt-5 text-4xl font-extrabold leading-tight text-base-content sm:text-5xl lg:text-6xl'>
              {translate('home.heroTitle')}
              <span className='mt-1 block text-primary'>{translate('home.heroHighlight')}</span>
            </h1>

            <p className='mt-5 max-w-xl text-base text-base-content/70 sm:text-lg'>{translate('home.heroDesc')}</p>

            <div className='mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
              <MyButton className='font-semibold' size='lg' onClick={() => router.push(ROUTES.register)}>
                {translate('home.ctaRegister')}
                <ArrowRightIcon className='size-5' />
              </MyButton>
              <MyButton size='lg' variant='outline' onClick={() => router.push(ROUTES.class)}>
                {translate('home.ctaClass')}
              </MyButton>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-base-content/60'>
              <span className='flex items-center gap-2'>
                <CheckBadgeIcon className='size-5 text-success' />
                {translate('home.why6Title')}
              </span>
              <span className='flex items-center gap-2'>
                <StarIcon className='size-5 text-warning' style={{ fill: 'currentColor' }} />
                4.9/5 · 500+ {translate('class.studentCount')}
              </span>
            </div>
          </div>

          <div className='relative hidden lg:block'>
            <div className='relative mx-auto aspect-square w-full max-w-md'>
              <div className='absolute inset-0 rotate-6 rounded-box bg-primary/15' />
              <div className='absolute inset-0 overflow-hidden rounded-box bg-base-200 shadow-2xl'>
                <MyImage
                  noAnimation
                  alt={translate('home.teacherTitle')}
                  className='!absolute !inset-0 !h-full !w-full object-cover'
                  src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
                />
              </div>

              <div className='absolute -bottom-6 -left-6 flex items-center gap-3 rounded-box border border-base-300 bg-base-100 p-4 shadow-xl'>
                <span className='flex size-12 items-center justify-center rounded-field bg-primary/10 text-primary'>
                  <AcademicIcon className='size-6' />
                </span>
                <div>
                  <p className='text-2xl font-extrabold text-base-content'>500+</p>
                  <p className='text-xs text-base-content/60'>{translate('class.studentCount')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className='w-full border-y border-base-300 bg-base-200'>
        <div className='m-auto grid w-full max-w-[1550px] grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4 md:px-12'>
          {DEMO_ACHIEVEMENTS.map((item) => (
            <div key={item.labelKey} className='text-center'>
              <div className='text-3xl font-extrabold text-primary sm:text-4xl'>{item.value}</div>
              <div className='mt-1 text-sm text-base-content/60'>{translate(item.labelKey as any)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <Section>
        <SectionHeading description={translate('home.whyDesc')} eyebrow={translate('home.badge')} title={translate('home.whyTitle')} />
        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {reasons.map((item) => (
            <div
              key={item.title}
              className='flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'
            >
              <span className='flex size-12 items-center justify-center rounded-field bg-primary/10 text-primary'>{item.icon}</span>
              <h3 className='text-lg font-bold text-base-content'>{item.title}</h3>
              <p className='text-sm leading-relaxed text-base-content/60'>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Classes */}
      <Section className='bg-base-200'>
        <SectionHeading description={translate('home.courseDesc')} eyebrow={translate('header.class')} title={translate('home.courseTitle')} />

        {isLoading ? (
          <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='h-80 rounded-box skeleton-loading' />
            ))}
          </div>
        ) : (
          <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {classes.slice(0, 6).map((item) => (
              <ClassCard key={item._id} data={item} />
            ))}
          </div>
        )}

        <div className='mt-10 flex justify-center'>
          <Link href={ROUTES.class}>
            <MyButton variant='outline'>
              {translate('common.seeAll')} <ArrowRightIcon className='size-4' />
            </MyButton>
          </Link>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading title={translate('home.processTitle')} />
        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div key={step.title} className='relative flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-6'>
              <span className='flex size-11 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-content'>
                {index + 1}
              </span>
              <h3 className='text-lg font-bold text-base-content'>{step.title}</h3>
              <p className='text-sm text-base-content/60'>{step.desc}</p>
              {index < steps.length - 1 && (
                <ArrowRightIcon className='absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 text-base-300 lg:block' />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section className='bg-base-200'>
        <SectionHeading
          description={translate('home.testimonialDesc')}
          eyebrow={translate('comment.title')}
          title={translate('home.testimonialTitle')}
        />
        <div className='mt-12'>
          <CommentSection readOnly limit={3} />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading title={translate('home.faqTitle')} />
        <div className='mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3'>
          {faqs.map((item) => (
            <div key={item.q} className='collapse collapse-plus rounded-box border border-base-300 bg-base-100'>
              <input name='home-faq' type='checkbox' />
              <div className='collapse-title text-base font-semibold text-base-content'>{item.q}</div>
              <div className='collapse-content text-sm text-base-content/70'>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-8 flex justify-center'>
          <Link href={ROUTES.faq}>
            <MyButton variant='ghost'>
              {translate('common.seeAll')} <ArrowRightIcon className='size-4' />
            </MyButton>
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section containerClassName='py-0 pb-20 md:py-0 md:pb-24'>
        <div className='relative overflow-hidden rounded-box bg-primary px-6 py-14 text-center text-primary-content shadow-xl md:px-12'>
          <div className='pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary-content/10 blur-2xl' />
          <div className='relative mx-auto flex max-w-2xl flex-col items-center'>
            <h2 className='text-3xl font-extrabold sm:text-4xl'>{translate('home.ctaTitle')}</h2>
            <p className='mt-3 text-sm opacity-90 sm:text-base'>{translate('home.ctaDesc')}</p>
            <MyButton
              className='mt-7 min-w-48 border-none bg-base-100 font-semibold text-primary hover:bg-base-200'
              size='lg'
              onClick={() => router.push(ROUTES.register)}
            >
              {translate('register.registerNow')}
              <ArrowRightIcon className='size-5' />
            </MyButton>
          </div>
        </div>
      </Section>
    </>
  )
}

export default HomeScreen
