import Link from 'next/link'

import MyImage from '../MyImage'

import Nav from './Components/Nav'

import { images } from '@/config/images'

const Header = () => {
  return (
    <>
      <header className='w-full flex justify-between items-center z-[11] fixed inset-x-0 top-0 h-14 bg-white/80 backdrop-blur border-b border-black/5'>
        <div className='w-full max-w-[1550px] px-5 m-auto flex items-center gap-3 h-full '>
          <div className='h-full relative p-1 '>
            <Link href={'/'}>
              <MyImage fill alt='logo-thayhongtoan' className='!relative !w-auto !h-full' src={images.logo} />
            </Link>
          </div>
          <Nav />
        </div>
      </header>

      <div className='w-full h-14 opacity-0' />
    </>
  )
}

export default Header
