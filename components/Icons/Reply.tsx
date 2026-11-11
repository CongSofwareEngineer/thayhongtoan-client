import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const ReplyIcon = ({ ...props }: Props) => {
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
      <path d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
