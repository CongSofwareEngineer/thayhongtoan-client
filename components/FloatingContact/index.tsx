'use client'
import Link from 'next/link'
import { useState } from 'react'

import MyImage from '../MyImage'
import { FacebookIcon } from '../Icons/Facebook'
import { PhoneIcon } from '../Icons/Phone'
import { PlusIcon } from '../Icons/Plus'
import { XMarkIcon } from '../Icons/XMark'

import { images } from '@/config/images'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

const BUBBLE = 'flex size-11 items-center justify-center rounded-full bg-base-100 shadow-lg ring-1 ring-base-300 transition-transform hover:scale-110'

/**
 * Always-reachable contact shortcuts. On mobile they collapse behind one FAB so
 * the stack never sits on top of a page's own buttons.
 */
const FloatingContact = () => {
  const { translate } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const links = (
    <>
      <Link aria-label='Zalo' className={BUBBLE} href={LINK_CONTACT.Zalo} target='_blank'>
        <MyImage noAnimation alt='zalo' className='!relative !size-6' src={images.icons.iconZalo} />
      </Link>
      <Link aria-label='Facebook' className={BUBBLE} href={LINK_CONTACT.FaceBook} target='_blank'>
        <FacebookIcon className='size-6 text-[#1877F2]' />
      </Link>
      <a aria-label={INFO_CONTACT.phoneDisplay} className={cn(BUBBLE, 'bg-primary text-primary-content ring-0')} href={LINK_CONTACT.SDT}>
        <PhoneIcon className='size-5' />
      </a>
    </>
  )

  return (
    <>
      {/* Desktop: always-visible stack */}
      <div className='fixed bottom-8 right-6 z-40 hidden flex-col gap-3 md:flex'>{links}</div>

      {/* Mobile: one FAB that reveals the shortcuts */}
      <div className='fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:hidden'>
        {expanded && <div className='flex flex-col items-end gap-3'>{links}</div>}
        <button
          aria-expanded={expanded}
          aria-label={translate('contact.title')}
          className='relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg'
          type='button'
          onClick={() => setExpanded((value) => !value)}
        >
          {!expanded && <span className='absolute inset-0 animate-ping rounded-full bg-primary/40' />}
          {expanded ? <XMarkIcon className='relative size-6' /> : <PhoneIcon className='relative size-6' />}
          {!expanded && <PlusIcon className='absolute -right-0.5 -top-0.5 size-4 rounded-full bg-base-100 text-primary' />}
        </button>
      </div>
    </>
  )
}

export default FloatingContact
