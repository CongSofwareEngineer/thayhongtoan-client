'use client'
import Link from 'next/link'

import MyButton from '@/components/MyButton'
import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'

const NotFound = () => {
  const { translate } = useLanguage()

  return (
    <div className='flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 px-5 py-20 text-center'>
      <p className='text-7xl font-extrabold text-primary sm:text-9xl'>404</p>
      <h1 className='text-2xl font-extrabold text-base-content'>{translate('errors.pageNotFound')}</h1>
      <p className='max-w-md text-sm text-base-content/60'>{translate('errors.pageNotFoundDesc')}</p>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Link href={ROUTES.home}>
          <MyButton className='font-semibold'>{translate('header.home')}</MyButton>
        </Link>
        <Link href={ROUTES.class}>
          <MyButton variant='outline'>{translate('class.title')}</MyButton>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
