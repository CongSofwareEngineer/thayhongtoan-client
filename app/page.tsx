'use client'
import ContainerContent from '@/components/ContainerContent'
import Header from '@/components/Header'
import useAos from '@/hooks/useAos'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { NextPage } from 'next'
import React from 'react'

import { FilterAPI } from '@/constants/app'
import dynamic from 'next/dynamic'
import MyLoading from '@/components/MyLoading'
import MyImage from '@/components/MyImage'
import { imageConfig } from '@/configs/images'

const HomeScreen: NextPage = () => {
  useAos()
  useFirstLoadPage()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const renderDesktop = () => {
    return <div>renderMobile</div>
  }

  const renderMobile = () => {
    return <div>renderMobile</div>
  }

  const renderHToSEO = () => {
    return (
      <>
        <h2 className='sr-only'>Sản Phẩm Nổi Bật Tại TC Store</h2>
        <h2 className='sr-only'>Giày Dép Thời Trang - Phong Cách & Chất Lượng</h2>
        <h2 className='sr-only'>Yến Sào Cao Cấp - Bổ Dưỡng Cho Sức Khỏe</h2>
        <h2 className='sr-only'>Laptop Hiện Đại - Công Nghệ Hàng Đầu</h2>
        <h2 className='sr-only'>Cà Phê Nguyên Chất - Hương Vị Tự Nhiên</h2>
        <h2 className='sr-only'>Mua Sắm Nhiều Mặt Hàng Khác Tại TC Store</h2>
      </>
    )
  }

  return (
    <>
      <Header>
        <h1 className='sr-only'>
          TC Store - Cửa Hàng Đa Dạng Sản Phẩm: Giày Dép, Yến Sào, Laptop, Cà Phê & Nhiều Mặt Hàng
          Khác
        </h1>
      </Header>
      <ContainerContent>
        {renderHToSEO()}

        {isMobile ? renderMobile() : renderDesktop()}
      </ContainerContent>
      <div className='absolute inset-0 w-full h-full  overflow-hidden'>
        <MyImage
          alt='bg'
          src={imageConfig.home.bg}
          className='!absolute inset-0 overflow-hidden !min-w-full !h-auto !w-auto !max-w-max !max-h-max !min-h-full'
        />
      </div>
    </>
  )
}

export default HomeScreen
