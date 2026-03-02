import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const SparklesIcon = ({ ...props }: Props) => {
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
        d='M5.25 7.5 6 5.25l.75 2.25L9 8.25 6.75 9 6 11.25 5.25 9 3 8.25l2.25-.75Zm9 0 1.5-4.5 1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5ZM12 18l.75-2.25L15 15l-2.25-.75L12 12l-.75 2.25L9 15l2.25.75L12 18Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

