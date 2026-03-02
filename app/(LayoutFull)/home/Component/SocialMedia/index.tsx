import { NextPage } from 'next'
import Link from 'next/link'

import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'
import useMedia from '@/hooks/useMedia'
import { PhoneIcon } from '@/components/Icons/Phone'
import { cn } from '@/utils/tailwind'

const SocialMedia: NextPage = () => {
  const { isMobile } = useMedia()

  if (isMobile) {
    return <></>
  }

  return (
    <div className='fixed right-3 top-1/2 z-40 -translate-y-1/2'>
      <div className='flex flex-col gap-3 rounded-2xl border border-default-200 bg-content1/80 p-2 shadow-medium backdrop-blur'>
        <Link href={LINK_CONTACT.Zalo} target='_blank'>
          <div className='relative h-10 w-10 rounded-xl border border-default-200 bg-background p-2 transition-transform hover:scale-105'>
            <MyImage fill alt={LINK_CONTACT.Zalo} className='!relative !w-full !h-auto' src={images.icons.iconZalo} />
          </div>
        </Link>

        <Link href={LINK_CONTACT.SDT} target='_blank'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl border border-default-200 bg-background transition-transform hover:scale-105'>
            <PhoneIcon className={cn('text-success')} style={{ fontSize: 24 }} />
          </div>
        </Link>
        <Link href={LINK_CONTACT.FaceBook} target='_blank'>
          <div className='relative h-10 w-10 rounded-xl border border-default-200 bg-background p-2 transition-transform hover:scale-105'>
            <MyImage fill alt={LINK_CONTACT.FaceBook} className='!relative !w-full !h-auto' src={images.icons.iconFacebook} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SocialMedia
