import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import { images } from '@/configs/images'
import dynamic from 'next/dynamic'
import MyImage from '../../MyImage'
import InputAreaForm from '@/components/Form/InputArea'
import InputForm from '@/components/Form/Input'
const OptionVnLocation = dynamic(() => import('../../OptionVnLocation'), { ssr: false })

const ContentFormPayment = ({ onChange, form }: { form: any; onChange: (param: any) => void }) => {
  const { translate } = useLanguage()

  return (
    <div className='bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 lg:pb-0 pb-3'>
      <div className='flex w-full gap-2'>
        <div>
          <MyImage
            src={images.userDetail.iconUserDetail}
            alt='my-cart-infoReceived'
            className=' !w-[25px] !h-[25px]'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoReceived')}</div>
      </div>

      <div className='relative w-full border-[1px] my-3 border-gray-300' />

      <div className='flex md:gap-6  flex-col md:grid md:grid-cols-2  '>
        <InputForm
          placeholder={translate('userDetail.sdt')}
          required
          label={translate('userDetail.sdt')}
          formData={form}
          keyName='sdt'
        />
        <InputForm
          placeholder={translate('userDetail.name')}
          required
          label={translate('userDetail.name')}
          formData={form}
          keyName='name'
          maxLength={25}
        />
      </div>

      <OptionVnLocation isNew={false} callback={onChange} />

      <InputAreaForm
        formData={form}
        maxLength={200}
        rows={2}
        keyName='noteBil'
        showCount
        label={translate('bill.noteBill')}
      />
      <div className='md:mb-5 mb-2' />
    </div>
  )
}

export default ContentFormPayment
