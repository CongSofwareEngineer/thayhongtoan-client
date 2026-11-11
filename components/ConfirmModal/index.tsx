'use client'
import { ReactNode } from 'react'

import MyButton from '../MyButton'

import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'

type Props = {
  description?: ReactNode
  confirmLabel?: string
  onConfirm: () => void | Promise<void>
  isDanger?: boolean
}

// Body of the shared confirm dialog; open it with useConfirm()
const ConfirmModal = ({ description, confirmLabel, onConfirm, isDanger = true }: Props) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()

  return (
    <div className='flex flex-col gap-5'>
      <p className='text-sm text-base-content/70'>{description || translate('common.deleteConfirmDesc')}</p>
      <div className='flex justify-end gap-2'>
        <MyButton variant='ghost' onClick={close}>
          {translate('common.cancel')}
        </MyButton>
        <MyButton
          color={isDanger ? 'error' : 'primary'}
          onClick={async () => {
            await onConfirm()
            close()
          }}
        >
          {confirmLabel || translate('common.delete')}
        </MyButton>
      </div>
    </div>
  )
}

export default ConfirmModal
