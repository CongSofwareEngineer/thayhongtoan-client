import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const PenNibIcon = ({ ...props }: Props) => {
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
        d='M14.25 3.75 20.25 9.75m-6-6-7.5 7.5a4.5 4.5 0 0 0-1.318 3.182V18a.75.75 0 0 0 .75.75h3.568a4.5 4.5 0 0 0 3.182-1.318l7.5-7.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M9 15.75h.008v.008H9v-.008Z' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

