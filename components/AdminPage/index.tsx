'use client'
import { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}

// Standard frame for every admin screen: title row + content card area
const AdminPage = ({ title, description, action, children, className }: Props) => (
  <div className={cn('flex w-full flex-col gap-6', className)}>
    <div className='flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center'>
      <div>
        <h1 className='text-2xl font-extrabold text-base-content'>{title}</h1>
        {description && <p className='text-sm text-base-content/60'>{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
)

type CardProps = { children: ReactNode; className?: string }

export const AdminCard = ({ children, className }: CardProps) => (
  <div className={cn('flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm', className)}>{children}</div>
)

export default AdminPage
