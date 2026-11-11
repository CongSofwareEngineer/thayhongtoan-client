'use client'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import PageHeader from '@/components/PageHeader'
import Section, { SectionHeading } from '@/components/Section'
import { AcademicIcon } from '@/components/Icons/Academic'
import { AwardIcon } from '@/components/Icons/Award'
import { ArrowRightIcon } from '@/components/Icons/ArrowRight'
import { HeartIcon } from '@/components/Icons/Heart'
import { ShieldIcon } from '@/components/Icons/Shield'
import { UsersIcon } from '@/components/Icons/Users'
import { DEMO_ACHIEVEMENTS, DEMO_GALLERY } from '@/constants/demoData'
import { INFO_CONTACT } from '@/constants/app'
import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'

const AboutScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()

  const values = [
    { icon: <HeartIcon />, title: translate('about.value1'), desc: translate('about.value1Desc') },
    { icon: <ShieldIcon />, title: translate('about.value2'), desc: translate('about.value2Desc') },
    { icon: <UsersIcon />, title: translate('about.value3'), desc: translate('about.value3Desc') },
  ]

  return (
    <>
      <PageHeader breadcrumb={[{ label: translate('about.title') }]} description={translate('about.subtitle')} title={translate('about.title')} />

      <Section>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-box bg-base-200 shadow-lg'>
            <MyImage
              alt={translate('home.teacherTitle')}
              className='!absolute !inset-0 !h-full !w-full object-cover'
              src='https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&q=80'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <SectionHeading align='left' eyebrow={translate('home.teacherRole')} title={translate('about.storyTitle')} />
            <p className='text-base leading-relaxed text-base-content/70'>{translate('about.story1')}</p>
            <p className='text-base leading-relaxed text-base-content/70'>{translate('about.story2')}</p>

            <div className='rounded-box border-l-4 border-primary bg-base-200 p-5'>
              <h3 className='font-bold text-base-content'>{translate('about.missionTitle')}</h3>
              <p className='mt-1 text-sm text-base-content/70'>{translate('about.missionDesc')}</p>
            </div>

            <MyButton className='self-start font-semibold' onClick={() => router.push(ROUTES.register)}>
              {translate('home.ctaRegister')}
              <ArrowRightIcon className='size-5' />
            </MyButton>
          </div>
        </div>
      </Section>

      <Section className='bg-base-200'>
        <SectionHeading title={translate('about.valueTitle')} />
        <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {values.map((item) => (
            <div key={item.title} className='flex flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-8 text-center'>
              <span className='flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary'>{item.icon}</span>
              <h3 className='text-lg font-bold text-base-content'>{item.title}</h3>
              <p className='text-sm text-base-content/60'>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={<AwardIcon className='size-4' />} title={translate('about.achievementTitle')} />
        <div className='mt-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
          {DEMO_ACHIEVEMENTS.map((item) => (
            <div key={item.labelKey} className='rounded-box border border-base-300 bg-base-100 p-6 text-center'>
              <div className='text-3xl font-extrabold text-primary sm:text-4xl'>{item.value}</div>
              <div className='mt-1 text-sm text-base-content/60'>{translate(item.labelKey as any)}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className='bg-base-200'>
        <SectionHeading title={translate('about.facilityTitle')} />
        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-4'>
          {DEMO_GALLERY.slice(0, 8).map((item) => (
            <div key={item.src} className='group relative aspect-square overflow-hidden rounded-box bg-base-300'>
              <MyImage
                alt={item.caption}
                className='!absolute !inset-0 !h-full !w-full object-cover transition-transform duration-500 group-hover:scale-110'
                src={item.src}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section containerClassName='pb-20'>
        <div className='flex flex-col items-center gap-4 rounded-box border border-base-300 bg-base-100 p-10 text-center'>
          <AcademicIcon className='size-10 text-primary' />
          <h3 className='text-2xl font-extrabold text-base-content'>{translate('home.ctaTitle')}</h3>
          <p className='max-w-xl text-sm text-base-content/60'>{translate('home.ctaDesc')}</p>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <MyButton className='font-semibold' onClick={() => router.push(ROUTES.register)}>
              {translate('register.registerNow')}
            </MyButton>
            <MyButton variant='outline' onClick={() => router.push(ROUTES.contact)}>
              {INFO_CONTACT.phoneDisplay}
            </MyButton>
          </div>
        </div>
      </Section>
    </>
  )
}

export default AboutScreen
