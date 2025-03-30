import { PageProps } from '@/.next/types/app/page'
import React from 'react'
import BlogScreen from './view'
import ClientApi from '@/services/clientApi'
import { IProduct } from '@/app/shoes/[...params]/type'
import { notFound } from 'next/navigation'

const getData = async (keyName: string): Promise<IProduct> => {
  const data = await ClientApi.getProductByKeyName(keyName)

  return data.data
}

const BlogPage = async ({ params }: PageProps) => {
  const { keyName } = await params
  console.log({ keyName })

  const productDetail = await getData(keyName)
  // if (!productDetail) {
  //   return notFound()
  // }

  return <BlogScreen data={productDetail as any} />
}

export default BlogPage
