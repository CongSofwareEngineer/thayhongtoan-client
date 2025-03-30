import { LINK_CONTACT } from '@/constants/app'
import useMedia from '@/hooks/useMedia'
import Link from 'next/link'
import React from 'react'
import { FaSquarePhoneFlip } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'

const Right = () => {
  const { isMobile } = useMedia()
  return (
    <div className='flex gap-5'>
      <Link target='_blank' href={LINK_CONTACT.Zalo} className='flex gap-1 items-center'>
        <MyImage alt='icon zalo' src={images.icon.iconZalo} className='!w-6 !h-6' />
        {!isMobile && <span>0344798392</span>}
      </Link>
      <Link target='_blank' href={LINK_CONTACT.SDT} className='flex gap-1 items-center'>
        <FaSquarePhoneFlip className='text-blue-700' style={{ fontSize: 20 }} />
        {!isMobile && <span>0344798392</span>}
      </Link>
      <Link target='_blank' href={LINK_CONTACT.FaceBook} className='flex gap-1 items-center'>
        <FaFacebook className='text-blue-700' style={{ fontSize: 20 }} />
        {!isMobile && <span>Thầy Hồng Toán</span>}
      </Link>
    </div>
  )
}

export default Right
