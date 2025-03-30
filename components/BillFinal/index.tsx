import { images } from '@/configs/images'
import { DEFAULT_FEE_SHIP } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { numberWithCommas } from '@/utils/functions'
import Image from 'next/image'
import React from 'react'
import ButtonForm from '../Form/ButtonForm'

const BillFinal = ({
  totalBill,
  totalBillFeeShip,
  loading = false,
  disabledSubmit = false,
}: {
  totalBill: string
  totalBillFeeShip: string
  loading: boolean
  disabledSubmit?: boolean
}) => {
  const { translate } = useLanguage()

  return (
    <div className='bg-white w-full  flex flex-col  border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 py-4'>
      <div className='flex w-full gap-2'>
        <div>
          <Image
            src={images.icon.iconBill}
            alt='my-cart-bill'
            fill
            className='!relative !w-[25px] !h-[25px]'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.detailPayment')}</div>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='flex justify-between w-full  mb-1'>
        <span>{translate('textPopular.totalMoney')}</span>
        <span className='font-bold text-green-600'>{totalBill} VNĐ</span>
      </div>
      <div className='flex justify-between w-full'>
        <span>{translate('textPopular.feeShip')}</span>
        <span className='font-bold text-green-600'>{`${numberWithCommas(DEFAULT_FEE_SHIP)} VNĐ`}</span>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='flex justify-between w-full'>
        <span>{translate('bill.totalBill')}</span>
        <span className='font-bold text-green-600'>{totalBillFeeShip} VNĐ</span>
      </div>
      <ButtonForm
        disabledSubmit={disabledSubmit}
        classBtnSubmit='w-full mt-3  !rounded-[4px]'
        loading={loading}
        disableClose
      />
    </div>
  )
}

export default BillFinal
