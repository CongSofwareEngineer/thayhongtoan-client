import useLanguage from '@/hooks/useLanguage'
import React from 'react'
import { images } from '@/configs/images'
import Image from 'next/image'

type PropsType = {
  icon?: string
  title?: string
  des?: string
}

const ModalProcess = ({ icon, des, title }: PropsType) => {
  const { translate } = useLanguage()

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-title text-center'>{title || translate('textPopular.statusProcessing')}</p>

      <div className='m-auto my-2 relative overflow-hidden'>
        <div className='animation_spin25s '>
          <Image
            src={icon || images.icon.iconLoadingModal}
            alt='icon-modal-delete'
            className='animate-pulse !w-auto !relative md:!h-[120px] !h-[70px]'
            priority
            fill
          />
        </div>
      </div>
      <div className='text-center mb-2 md:max-w-[90%] m-auto'>{des}</div>
    </div>
  )
}
export default ModalProcess
