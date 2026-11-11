import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const XMarkIcon = ({ ...props }: Props) => {
  return (
    <svg
      {...props}
      className={cn('size-5', props.className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 18 18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
