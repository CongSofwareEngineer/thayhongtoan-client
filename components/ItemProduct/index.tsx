import styles from './style.module.css'
import Link from 'next/link'
import { images } from '@/configs/images'
import { detectImg, formatPrice, formatPriceBase, numberWithCommas } from '@/utils/functions'
import MyImage from '../MyImage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useRoutePage from '@/hooks/useRoutePage'
import { RateCustom, TextPriceBase } from './styled'
import MySliderSell from '../MySliderSell'
import { IClientApi } from '@/services/ClientApi/type'

type ItemType = {
  item: IClientApi['product']
  callback?: () => void
  className?: string | ''
  classImage?: string | ''
  showSold?: boolean
  showFeedback?: boolean
  showDiscount?: boolean
  href?: string
  noClick?: boolean
}
const ItemProduct = ({
  item,
  callback = () => {},
  className,
  showSold = false,
  showFeedback = false,
  showDiscount = true,
  href = '',
  noClick = false,
}: ItemType) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { push } = useRoutePage()

  const handleClick = () => {
    push(href)
    callback()
  }

  const renderContent = () => {
    return (
      <div
        className={`  group relative item-list cursor-pointer px-3 md:pt-6 pt-4 md:pb-4 pb-3 gap-3 flex items-center justify-between flex-col ${styles['item-coffee']} ${className}`}
      >
        {showDiscount && item?.disCount! > 0 && (
          <div className='absolute text-black right-0 top-4 bg-green-300   px-2  rounded-l-md z-[1]'>
            -{item?.disCount}%
          </div>
        )}

        <div className='m-auto max-w-[85%] relative w-full aspect-square  overflow-hidden'>
          <MyImage
            src={detectImg(item?.imageMain || images.userDetail.iconUserDetail, 350)}
            alt={`item-${item?.name || href}`}
            className='!h-auto group-hover:scale-110 transform !transition !duration-300 !ease-in-out select-none'
          />
        </div>
        <div className='w-full gap-1 flex flex-col'>
          <p className='w-full md:text-medium font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
            {item?.name}
          </p>
          <TextPriceBase className=' w-full   '>{`${formatPriceBase(item?.price || 150, item?.disCount)} VNĐ`}</TextPriceBase>

          <div className='w-full  text-green-600 xl:text-[24px] md:text-[18px] text-[13px] font-bold flex justify-between  '>
            {formatPrice(item?.price || 150)}
            VNĐ
          </div>
          {!isMobile && (
            <MySliderSell total={item.amount} sell={item.sold} className={'text-[12px]'} />
          )}

          {showSold && (
            <div className='md:mt-2 text-[11px] flex w-full justify-between items-center'>
              <span>{`${translate('productDetail.sold')}  ${numberWithCommas(item.sold || '0')}`}</span>

              {showFeedback && (
                <div className='flex gap-1 items-center'>
                  <RateCustom readOnly defaultValue={5} style={{ fontSize: 12 }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
  if (noClick) {
    return (
      <div className='group w-full select-none' onClick={callback}>
        {renderContent()}
      </div>
    )
  }

  return (
    <Link className='group' onClick={handleClick} href={href}>
      {renderContent()}
    </Link>
  )
}

export default ItemProduct
