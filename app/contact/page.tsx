import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import Header from '@/components/Header'
import ContainerContent from '@/components/ContainerContent'
import ContactScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Liên Hệ TC Store - Kết Nối Nhanh, Hỗ Trợ Tận Tâm',
    override: true,
    des: 'Cần tư vấn hoặc giải đáp thắc mắc? Liên hệ TC Store ngay để được hỗ trợ nhanh chóng. Chúng tôi luôn sẵn sàng giúp bạn với các sản phẩm yến sào, laptop, cây cảnh, nước hoa, cà phê và hơn thế nữa!',
  })
  return metaData
}
const ContactLayout: NextPage = () => {
  return (
    <>
      <Header>
        <h1 className='sr-only'>Liên Hệ TC Store - Kết Nối Với Chúng Tôi Ngay Hôm Nay</h1>
      </Header>
      <ContainerContent>
        <h2 className='sr-only'>Thông Tin Liên Hệ Chính Thức Của TC Store</h2>
        <h2 className='sr-only'>Hỗ Trợ Khách Hàng 24/7 - Giải Đáp Mọi Thắc Mắc</h2>
        <h2 className='sr-only'>Địa Chỉ Showroom & Văn Phòng TC Store</h2>
        <h2 className='sr-only'>Gửi Tin Nhắn Trực Tiếp Cho Đội Ngũ Hỗ Trợ</h2>
        <h2 className='sr-only'>Câu Hỏi Thường Gặp (FAQs) Về Liên Hệ</h2>
        <ContactScreen />
      </ContainerContent>
    </>
  )
}

export default ContactLayout
