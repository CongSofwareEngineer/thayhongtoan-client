import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import { cn } from '@/utils/tailwind'
import { Button, Group } from '@mantine/core'
import React from 'react'

type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  classBtnSubmit?: string
  classBtnCancel?: string
  disabledSubmit?: boolean
}

const ButtonForm = ({
  loading,
  disableClose = false,
  titleSubmit = '',
  titleClose = '',
  classBtnSubmit = '',
  classBtnCancel = '',
  disabledSubmit = false,
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <Group justify='center' className='w-full '>
      <Button
        loading={loading}
        disabled={disabledSubmit}
        type='submit'
        className={cn('flex flex-1 !w-full', classBtnSubmit)}
      >
        {titleSubmit || translate('cart.payment')}
      </Button>
      {!disableClose && (
        <Button
          className={cn('flex flex-1', classBtnCancel)}
          onClick={closeModalDrawer}
          variant='filled'
        >
          {titleClose || translate('common.close')}
        </Button>
      )}
    </Group>
  )
}

export default ButtonForm
