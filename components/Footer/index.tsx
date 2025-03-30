'use client'
import { images } from '@/configs/images'
import React from 'react'
import Link from 'next/link'
import { copyToClipboard } from '@/utils/notification'
import Image from 'next/image'
import { AiOutlineCopy } from 'react-icons/ai'
import { LINK_CONTACT } from '@/constants/app'

const Item = ({ icon, value, link }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      <Image
        fill
        alt={`icon-footer-${value}`}
        src={icon}
        className='!relative md:!w-[25px] !w-[20px] md:!h-[25px] !h-[20px]'
      />
      <Link target='_blank' href={link} className='hover:underline cursor-pointer'>
        {value}
      </Link>
      <AiOutlineCopy onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  return (
    <footer className='no footer-web w-full bg-white flex justify-center '>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className=' w-full max-w-[1350px] md:p-[50px] p-[20px]  pb-10 '>
          <p className='text-medium font-bold mb-2'>Thông tin vẻ Shop</p>
          <div className='flex md:flex-row flex-col w-full justify-between md:gap-0 gap-4'>
            <div className='flex flex-col md:gap-3 gap-2 md:w-[48%] w-full'>
              <Item
                icon={images.footer.iconGmail}
                value={'hodiencong2000.@gmail.com'}
                link={LINK_CONTACT.Mail}
              />
              <Item
                icon={images.footer.iconNumberPhone}
                value={'Hồ Diên Công'}
                link={LINK_CONTACT.SDT}
              />

              <Item
                icon={images.footer.iconZalo}
                value={'+84392225405'}
                link={LINK_CONTACT.Zalo}
                type={'zalo'}
              />
              <Item icon={images.footer.iconFace} value={'Facebook'} link={LINK_CONTACT.FaceBook} />
              <Item
                icon={images.footer.iconGithub}
                value={'CongSofwareEngineer'}
                link={LINK_CONTACT.Github}
              />
              <Item
                icon={images.footer.iconAddress}
                value={'83/41, Phạm Văn Bạch, P.15, Tân Bình, TP.HCM'}
                link={LINK_CONTACT.GGMap}
              />
            </div>
            <div className='w-full md:w-[48%] min-h-[200px]'>
              <div style={{ height: '100%', width: '100%', minHeight: 200 }}>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.925735303758!2d106.63089767616822!3d10.816995289334312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529d60f102fe1%3A0x48a05f8f5cd877f6!2zODMvNDEgUGjhuqFtIFbEg24gQuG6oWNoLCBQaMaw4budbmcgMTUsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1723361925647!5m2!1svi!2s'
                  className='w-full h-full'
                  loading='lazy'
                  title='TC Store'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-center mb-2'>
          <span>Copyright © 2024</span>
          <Link href={LINK_CONTACT.HoDieCong} target='_blank'>
            <span className='hover:underline hover:scale-105 text-green-500'>CÔNG</span>
          </Link>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
