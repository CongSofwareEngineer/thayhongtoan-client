import { images } from '@/configs/images'
import useLanguage from '@/hooks/useLanguage'
import React from 'react'
import MyImage from '../MyImage'
import { OptionPaymentType } from './type'

const OptionsPayment = ({ listOptions, onChangeOptions, optionSelected }: OptionPaymentType) => {
  const { translate } = useLanguage()

  const getIcon = (value: string) => {
    if (optionSelected.value === value) {
      return images.icon.iconCheckBoxSelected
    }
    return images.icon.iconCheckBox
  }

  return (
    <div className='bg-white w-full  flex flex-col   border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 py-4'>
      <div className='flex w-full gap-2'>
        <div>
          <MyImage
            src={images.icon.iconOptionPayment}
            alt='icon-optionPayment-bill'
            className='  !w-[25px] !h-[25px]'
          />
        </div>

        <div className='text-medium font-semibold'>{translate('optionPayment.paymentMethod')}</div>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='w-full flex flex-col  md:gap-2 gap-2'>
        {listOptions.map((e, index) => {
          return (
            <div className='relative flex gap-2 items-center' key={`option-payment-${index}`}>
              <div
                onClick={() => onChangeOptions(e)}
                className='cursor-pointer flex gap-2  md:text-[16px] text-[14px] items-center'
              >
                <MyImage src={getIcon(e.value)} alt={`checkbox-${e.name}`} className=' !w-5 !h-5' />
                {e.icon && (
                  <MyImage src={e.icon} alt={`icon-${e.name}`} className=' !w-[18px] !h-[18px]' />
                )}
                <span>{e.name}</span>
              </div>
              {e.disabled && (
                <div className='bg-white absolute w-full h-full inset-0 opacity-60 z-10 cursor-no-drop ' />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OptionsPayment
