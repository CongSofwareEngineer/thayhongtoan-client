import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import AboutScreen from './view'
import { FirebaseAbout } from '@/services/firebaseService'
import Header from '@/components/Header'
import ContainerContent from '@/components/ContainerContent'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent

  const metaData = generateMetaBase({
    dataBase,
    title: 'TC Store - Địa Chỉ Uy Tín Tại Bình Dương | Giày Thời Trang, Yến Sào, Cà Phê Cao Cấp',
    override: true,
    des: 'TC Store chuyên cung cấp giày thời trang, yến sào, cà phê cao cấp tại Bình Dương. Thành lập bởi nhóm sinh viên TDMU, TC Store cam kết sản phẩm chất lượng, bảo hành uy tín và nhiều ưu đãi hấp dẫn. Miễn phí giao hàng trong bán kính 10km.',
  })
  return metaData
}
const AboutLayout = async () => {
  // const res = await ClientApi.getAbout()
  const res = await FirebaseAbout.getAllData()

  return (
    <>
      <Header>
        <h1 className='absolute opacity-0'>
          Giới thiệu về TC Store - Hành trình mang giá trị đến khách hàng
        </h1>
      </Header>
      <ContainerContent>
        <AboutScreen data={res[0]} />
      </ContainerContent>
    </>
  )
}

export default AboutLayout
