import useLanguage from '@/hooks/useLanguage'
import React from 'react'
import { images } from '@/configs/images'
import useModalDrawer from '@/hooks/useModalDrawer'
import Image from 'next/image'
import { Button } from '@mantine/core'

type Props = {
  title?: string
  titleSubmit?: string
  titleClose?: string
  des?: string
  icon?: string
  callback?: ((params?: any) => any) | null
  showClose?: boolean | false
}
const ModalSuccess = ({ showClose = false, callback = null, ...props }: Props) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <div className='flex flex-col w-full gap-4 justify-center align-middle'>
      <p className='text-title text-center'>
        {props?.title || translate('warning.doYouWantDetele')}
      </p>
      <div className='m-auto my-2 relative overflow-hidden'>
        <Image
          src={props.icon || images.icon.iconSuccess}
          alt='icon-modal-success'
          priority
          fill
          className='!relative !w-auto md:!h-[100px] !h-[70px]'
        />
      </div>
      {props?.des && <div className='text-center mb-2 md:max-w-[90%] m-auto'>{props.des}</div>}

      <div className='flex w-full gap-3'>
        <div className='flex flex-1'>
          <Button className='!w-full' onClick={() => (callback ? callback() : closeModalDrawer())}>
            {props.titleSubmit || translate('common.ok')}
          </Button>
        </div>
        {showClose && (
          <div className='flex flex-1'>
            <Button className='!w-full' variant='filled' onClick={() => closeModalDrawer()}>
              {props.titleClose || translate('common.close')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalSuccess
