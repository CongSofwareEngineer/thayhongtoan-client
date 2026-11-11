'use client'

import { useEffect } from 'react'

import MyButton from '@/components/MyButton'
import { SettingIcon } from '@/components/Icons/Setting'
import useLanguage from '@/hooks/useLanguage'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { translate } = useLanguage()

  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 px-5 py-20 text-center'>
      <SettingIcon className='size-14 text-base-content/20' />
      <h2 className='text-2xl font-extrabold text-base-content'>{translate('errors.serverError')}</h2>
      <MyButton className='font-semibold' onClick={() => reset()}>
        {translate('common.refresh')}
      </MyButton>
    </div>
  )
}
