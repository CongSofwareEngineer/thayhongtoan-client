'use client'
import Link from 'next/link'

import MyImage from '../MyImage'

import Nav from './Components/Nav'

import { images } from '@/config/images'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import { ROUTES } from '@/constants/routes'
import { PhoneIcon } from '@/components/Icons/Phone'
import { ClockIcon } from '@/components/Icons/Clock'
import useLanguage from '@/hooks/useLanguage'

const Header = () => {
  const { translate } = useLanguage()

  return (
    <>
      {/* Top strip: hotline + opening hours, the two things parents look for first */}
      <div className='hidden w-full bg-primary text-primary-content md:block'>
        <div className='m-auto flex h-9 w-full max-w-[1550px] items-center justify-between px-5 text-xs md:px-12'>
          <div className='flex items-center gap-2'>
            <ClockIcon className='size-4' />
            <span>{translate('contact.workingTimeValue')}</span>
          </div>
          <a className='flex items-center gap-2 font-semibold hover:underline' href={LINK_CONTACT.SDT}>
            <PhoneIcon className='size-4' />
            <span>{INFO_CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <header className='sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur'>
        <div className='m-auto flex h-16 w-full max-w-[1550px] items-center gap-3 px-5 md:px-12'>
          <Link className='relative flex h-full shrink-0 items-center py-2' href={ROUTES.home}>
            <MyImage noAnimation alt={INFO_CONTACT.name} className='!relative !h-10 !w-auto' src={images.logo} />
          </Link>
          <Nav />
        </div>
      </header>
    </>
  )
}

export default Header
