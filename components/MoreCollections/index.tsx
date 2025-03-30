import React, { useEffect, useRef, useState } from 'react'
import MyCollections from '../MyCollections'
import ItemProduct from '../ItemProduct'
import { TYPE_PRODUCT } from '@/constants/admin'
import { useParams } from 'next/navigation'
import LoadingGetData from '../LoadingGetData'
import ClientApi from '@/services/clientApi'
import useRoutePage from '@/hooks/useRoutePage'

const MoreCollections = () => {
  const router = useRoutePage()
  const param = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    const getData = async () => {
      const res = await ClientApi.getMoreCollections(10)
      setData(res?.data || [])
      setIsLoading(false)
    }
    getData()
  }, [])

  const isClickItemRef = useRef(true)

  const getRouteProduct = (product: any) => {
    if (isClickItemRef.current) {
      if (product.category === TYPE_PRODUCT.shoes) {
        router.push(`/shoes/${product.keyName}`)
      } else {
        router.push(`/shop/${product.keyName}`)
      }
    }
  }

  if (isLoading) {
    return <LoadingGetData loading colDesktop={5} />
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <MyCollections isClickItem={isClickItemRef}>
        <>
          {data.map((e, index: number) => {
            if (e.keyName !== param.params?.[0]) {
              return (
                <div key={`item-MyCollections-${index}`} className=' min-w-[200px] select-none'>
                  <ItemProduct
                    showDiscount
                    className='!bg-gray-100 !shadow-full'
                    noClick
                    callback={() => getRouteProduct(e)}
                    item={e}
                    showSold
                  />
                </div>
              )
            }
          })}
        </>
      </MyCollections>
    </div>
  )
}

export default MoreCollections
