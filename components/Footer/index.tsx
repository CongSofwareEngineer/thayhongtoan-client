'use client'
import Link from 'next/link'

import MyImage from '../MyImage'
import { ContactIcon } from '../Icons/Contact'
import { CopyIcon } from '../Icons/Copy'

import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'
import { copyToClipboard } from '@/utils/notification'

const Item = ({ icon, value, link }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      {typeof icon === 'string' ? (
        <MyImage fill alt={`icon-footer-${value}`} className='!relative md:!w-[25px] !w-[20px] md:!h-[25px] !h-[20px]' src={icon} />
      ) : (
        <div className='md:text-[25px] text-[20px]'>{icon}</div>
      )}

      <Link className='hover:underline cursor-pointer text-gray-600' href={link} target='_blank'>
        {value}
      </Link>
      <CopyIcon className='text-gray-400 hover:text-gray-600 cursor-pointer' onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  return (
    <footer className='no footer-web w-full bg-gray-50 border-t border-black/5 flex justify-center md:mt-5 mt-3 text-gray-900'>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className=' w-full max-w-[1550px] md:px-[50px] px-[20px] py-5 '>
          <p className='text-title font-bold mb-2'>Thông tin liên hệ</p>
          <div className='flex md:flex-row flex-col w-full justify-between md:gap-0 gap-4'>
            <div className='flex flex-col md:gap-3 gap-2 md:w-[48%] w-full'>
              {/* 
              <Item icon={images.icons.iconNumberPhone} link={LINK_CONTACT.SDT} value={'Hồ Diên Công'} /> */}

              <Item icon={<ContactIcon className='text-default' />} link={LINK_CONTACT.Mail} value={'hodienhong8392@gmail.com'} />
              <Item icon={images.icons.iconZalo} link={LINK_CONTACT.Zalo} type={'zalo'} value={'+84344798392'} />
              <Item icon={images.icons.iconFacebook} link={LINK_CONTACT.FaceBook} value={'Facebook'} />
              {/* <Item icon={images.icons.icon} link={LINK_CONTACT.Github} value={'CongSofwareEngineer'} /> */}
              {/* <Item icon={images.footer.iconAddress} link={LINK_CONTACT.GGMap} value={'83/41, Phạm Văn Bạch, P.15, Tân Bình, TP.HCM'} /> */}
            </div>
            <div className='w-full md:w-[48%] min-h-[200px]'>
              <div style={{ height: '100%', width: '100%', minHeight: 200 }}>
                <iframe className='w-full h-full rounded-2xl border border-black/5' loading='lazy' src={LINK_CONTACT.GGMap} title='TC Store' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-center mb-3 text-sm text-gray-500'>
          <span>Copyright © 2024</span>
          <Link href={LINK_CONTACT.HoDieCong} target='_blank'>
            <span className='hover:underline hover:scale-105 text-default'>CÔNG</span>
          </Link>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
