import { ResolvingMetadata } from 'next'
import React from 'react'

import ClassScreen from './client'

import { generateMetaBase } from '@/utils/serverNext'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent

  const metaData = generateMetaBase({
    dataBase,
    title: 'Thày Hồng Toán | Các lớp học',
  })

  return metaData
}

const ClassPage = () => {
  return <ClassScreen />
}

export default ClassPage
