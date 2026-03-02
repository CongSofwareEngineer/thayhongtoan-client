import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const LightBulbIcon = ({ ...props }: Props) => {
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
        d='M12 3a6.75 6.75 0 0 0-3.75 12.36c.44.3.75.79.75 1.32V18a2.25 2.25 0 0 0 2.25 2.25h1.5A2.25 2.25 0 0 0 15 18v-1.32c0-.53.31-1.02.75-1.32A6.75 6.75 0 0 0 12 3Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M9.75 21h4.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

