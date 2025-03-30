'use client'
import { images } from '@/configs/images'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Right from './components/Right'
const Nav = dynamic(() => import('./components/Nav'))

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header>
      <div className='w-full h-14 ' />
      <div className='w-full h-14 fixed z-10 inset-0 '>
        <div className='border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white'>
          <div
            id='id-container-header'
            className='md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center'
          >
            <div className='h-full relative '>
              <Link href={'/'}>
                <Image
                  src={images.logo}
                  alt='logo-tcstore'
                  fill
                  className='!relative !w-auto !h-full'
                />
              </Link>
            </div>

            <Nav />
            <Right />
          </div>
        </div>
      </div>
      {children}
    </header>
  )
}

export default Header
