'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ChevronRightIcon } from '../Icons/ChevronRight'

import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

type Props = {
  title: ReactNode
  description?: ReactNode
  breadcrumb?: Array<{ label: string; href?: string }>
  className?: string
  children?: ReactNode
}

// Shared hero band at the top of every inner public page
const PageHeader = ({ title, description, breadcrumb, className, children }: Props) => {
  const { translate } = useLanguage()

  return (
    <div className={cn('w-full border-b border-base-300 bg-base-200', className)}>
      <div className='m-auto w-full max-w-[1550px] px-5 py-10 md:px-12 md:py-14'>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className='mb-3 flex flex-wrap items-center gap-1 text-xs text-base-content/50'>
            <Link className='hover:text-primary' href={ROUTES.home}>
              {translate('header.home')}
            </Link>
            {breadcrumb.map((item) => (
              <span key={item.label} className='flex items-center gap-1'>
                <ChevronRightIcon className='size-3' />
                {item.href ? (
                  <Link className='hover:text-primary' href={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span className='text-base-content/80'>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className='text-3xl font-extrabold text-base-content sm:text-4xl'>{title}</h1>
        {description && <p className='mt-2 max-w-2xl text-base text-base-content/60'>{description}</p>}
        {children}
      </div>
    </div>
  )
}

export default PageHeader
