'use client'
import Link from 'next/link'

import MyImage from '../MyImage'
import { ContactIcon } from '../Icons/Contact'
import { CopyIcon } from '../Icons/Copy'
import { LocationIcon } from '../Icons/Location'
import { PhoneIcon } from '../Icons/Phone'
import { ClockIcon } from '../Icons/Clock'
import { FacebookIcon } from '../Icons/Facebook'

import { images } from '@/config/images'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'
import { copyToClipboard } from '@/utils/notification'

const ContactRow = ({ icon, value, link, copyable = true }: { icon: React.ReactNode; value: string; link?: string; copyable?: boolean }) => (
  <div className='flex items-center gap-2 text-sm'>
    <span className='shrink-0 text-primary'>{icon}</span>
    {link ? (
      <Link className='text-base-content/70 hover:text-primary hover:underline' href={link} target='_blank'>
        {value}
      </Link>
    ) : (
      <span className='text-base-content/70'>{value}</span>
    )}
    {copyable && (
      <button aria-label='copy' className='text-base-content/30 hover:text-primary' type='button' onClick={() => copyToClipboard(value)}>
        <CopyIcon className='size-4' />
      </button>
    )}
  </div>
)

const Footer = () => {
  const { translate } = useLanguage()

  const siteLinks = [
    { href: ROUTES.about, label: translate('header.about') },
    { href: ROUTES.class, label: translate('header.class') },
    { href: ROUTES.schedule, label: translate('header.schedule') },
    { href: ROUTES.tuition, label: translate('header.tuition') },
  ]

  const helpLinks = [
    { href: ROUTES.faq, label: translate('header.faq') },
    { href: ROUTES.blog, label: translate('header.blog') },
    { href: ROUTES.gallery, label: translate('header.gallery') },
    { href: ROUTES.tracking, label: translate('header.tracking') },
  ]

  return (
    <footer className='mt-auto w-full border-t border-base-300 bg-base-200'>
      <div className='m-auto w-full max-w-[1550px] px-5 py-12 md:px-12'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col gap-4'>
            <div className='relative h-10'>
              <MyImage noAnimation alt={INFO_CONTACT.name} className='!relative !h-10 !w-auto' src={images.logo} />
            </div>
            <p className='text-sm leading-relaxed text-base-content/60'>{translate('home.heroDesc')}</p>
            <div className='flex gap-2'>
              <Link aria-label='Facebook' className='btn btn-circle btn-ghost btn-sm' href={LINK_CONTACT.FaceBook} target='_blank'>
                <FacebookIcon className='size-5 text-primary' />
              </Link>
              <Link aria-label='Zalo' className='btn btn-circle btn-ghost btn-sm' href={LINK_CONTACT.Zalo} target='_blank'>
                <MyImage noAnimation alt='zalo' className='!relative !size-5' src={images.icons.iconZalo} />
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-base-content'>{translate('footer.exploreTitle')}</h3>
            {siteLinks.map((item) => (
              <Link key={item.href} className='text-sm text-base-content/70 hover:text-primary hover:underline' href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-base-content'>{translate('footer.supportTitle')}</h3>
            {helpLinks.map((item) => (
              <Link key={item.href} className='text-sm text-base-content/70 hover:text-primary hover:underline' href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='text-sm font-bold uppercase tracking-wide text-base-content'>{translate('contact.infoTitle')}</h3>
            <ContactRow icon={<PhoneIcon className='size-4' />} link={LINK_CONTACT.SDT} value={INFO_CONTACT.phoneDisplay} />
            <ContactRow icon={<ContactIcon className='size-4' />} link={LINK_CONTACT.Mail} value={INFO_CONTACT.email} />
            <ContactRow copyable={false} icon={<LocationIcon className='size-4' />} value={INFO_CONTACT.address} />
            <ContactRow copyable={false} icon={<ClockIcon className='size-4' />} value={translate('contact.workingTimeValue')} />
          </div>
        </div>

        <div className='mt-10 min-h-[220px] overflow-hidden rounded-box border border-base-300'>
          <iframe className='h-[220px] w-full' loading='lazy' src={LINK_CONTACT.GGMap} title={translate('contact.mapTitle')} />
        </div>
      </div>

      <div className='border-t border-base-300'>
        <div className='m-auto flex w-full max-w-[1550px] flex-col items-center justify-between gap-2 px-5 py-4 text-xs text-base-content/50 md:flex-row md:px-12'>
          <span>
            © {new Date().getFullYear()} {INFO_CONTACT.name}. All rights reserved.
          </span>
          <Link className='hover:text-primary hover:underline' href={LINK_CONTACT.HoDieCong} target='_blank'>
            Developed by CÔNG
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
