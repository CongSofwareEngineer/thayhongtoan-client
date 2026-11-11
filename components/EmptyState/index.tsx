import { ReactNode } from 'react'

import { InboxIcon } from '../Icons/Inbox'

import { cn } from '@/utils/tailwind'

type Props = {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

const EmptyState = ({ title, description, icon, action, className }: Props) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-3 rounded-box border border-dashed border-base-300 px-6 py-14 text-center',
      className
    )}
  >
    <span className='text-base-content/30'>{icon || <InboxIcon className='size-12' />}</span>
    <p className='text-base font-semibold text-base-content'>{title}</p>
    {description && <p className='max-w-md text-sm text-base-content/60'>{description}</p>}
    {action}
  </div>
)

export default EmptyState
