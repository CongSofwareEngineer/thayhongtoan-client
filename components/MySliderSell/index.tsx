import useLanguage from '@/hooks/useLanguage'
import React, { AriaAttributes } from 'react'

type MySliderSellType = {
  total?: number
  sell?: number
  text?: string
  className?: string
} & AriaAttributes
const MySliderSell = ({ total = 1, sell = 1, text, className, ...props }: MySliderSellType) => {
  let width = (sell / total) * 100
  if (width < 3) {
    width = 2
  }

  const { translate } = useLanguage()

  return (
    <div className={`relative rounded-lg py-1 w-full bg-[#06bf7b33] ${className}`} {...props}>
      <div className='text-center relative z-[2] md:text-[13px] text-xs'>
        {text || translate('productDetail.sold')}
      </div>
      <div
        style={{ width: `${width}%` }}
        className={`absolute top-0 z-[1] left-0 rounded-lg bg-[#66FF33] h-full`}
      />
    </div>
  )
}

export default MySliderSell
