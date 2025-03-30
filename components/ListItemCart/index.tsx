import React, { useState } from 'react'
import useMedia from '@/hooks/useMedia'
import useLanguage from '@/hooks/useLanguage'
import { AiOutlineLoading } from 'react-icons/ai'
import { IListItemCart, IProductCart } from './type'
import { Checkbox } from '@mantine/core'
import ItemCart from './ItemCart'
import TitleItem from './TitleItem'

const ListItemCart = ({
  dataCart,
  callBackClick = () => {},
  callBackDelete = () => {},
  callBackSelectAll = () => {},
  loading = true,
  noEdit = false,
  noTitle = false,
}: IListItemCart) => {
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const handleSelectedAll = (e = false) => {
    callBackSelectAll(e)
    setIsSelectedAll(e)
  }

  const handleCliCkItem = (item: IProductCart, index: number) => {
    if (!item?.selected) {
      setIsSelectedAll(false)
    }
    callBackClick(item, index)
  }

  const renderMobile = () => {
    return (
      <>
        {!noTitle && (
          <table className='w-full md:min-w-[700px] '>
            <TitleItem
              allSelected={isSelectedAll}
              noEdit={noEdit}
              dataCart={dataCart}
              callBack={handleSelectedAll}
            />
          </table>
        )}
        {loading && (
          <div className='my-5 text-medium'>
            <AiOutlineLoading className='animate-spin' />
          </div>
        )}
        {dataCart.map((e, index) => {
          return (
            <ItemCart
              noEdit={noEdit}
              callBack={(e) => handleCliCkItem(e, index)}
              callBackDelete={() => callBackDelete(index)}
              key={index}
              data={e}
              noBorder={index === dataCart.length - 1}
            />
          )
        })}
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <div className='w-full flex gap-3 items-center p-3 pb-4  border-b-[3px] border-gray-200 font-bold'>
          <div className='w-8 flex items-center justify-center'>
            <Checkbox checked={isSelectedAll} onChange={() => handleSelectedAll(!isSelectedAll)} />
          </div>
          <div className='w-[120px] text-center'>{translate('textPopular.image')}</div>
          <div className='flex flex-1 justify-center-center items-center'>
            <div>{translate('textPopular.product')}</div>
          </div>
        </div>
        {dataCart.map((e, index) => {
          return (
            <ItemCart
              noEdit={noEdit}
              callBack={(e) => handleCliCkItem(e, index)}
              callBackDelete={async () => callBackDelete(index)}
              key={index}
              data={e}
              noBorder={index === dataCart.length - 1}
            />
          )
        })}
        {loading && (
          <div className='flex justify-center w-full'>
            <div className='my-5 text-medium'>
              <AiOutlineLoading className='animate-spin' />
            </div>
          </div>
        )}
      </>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ListItemCart
