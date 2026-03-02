import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const BrainIcon = ({ ...props }: Props) => {
  return (
    <svg
      className={cn('size-6', props.className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10.5 4.5a3 3 0 0 0-3 3v9.75a3.75 3.75 0 0 0 3.75 3.75h.75V4.5h-1.5Zm3 0v16.5h.75A3.75 3.75 0 0 0 18 17.25V7.5a3 3 0 0 0-3-3h-1.5Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 8.25a1.5 1.5 0 0 0 1.5 1.5m-1.5 4.5a1.5 1.5 0 0 0 1.5 1.5m3-7.5a1.5 1.5 0 0 1 1.5 1.5m-1.5 4.5a1.5 1.5 0 0 1 1.5 1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

