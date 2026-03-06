import { MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger'
  disabled?: boolean
  isLoading?: boolean
  spinner?: ReactNode // Custom spinner nếu muốn
  className?: string
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  size?: 'lg' | 'sm' | 'default'
  variant?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const getClassColor = (type: string = 'default') => {
  switch (type) {
    case 'primary':
      return 'bg-[#F59E0B] hover:bg-[#D97706] text-white'
    case 'secondary':
      return 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    case 'success':
      return 'bg-[#22C55E] hover:bg-[#16a34a] text-white'
    case 'warning':
      return 'bg-[#F59E0B] hover:bg-[#D97706] text-white'
    case 'error':
      return 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
    default:
      return 'bg-[#22C55E] hover:bg-[#7ec192] text-white'
  }
}

// Spinner component đơn giản bằng Tailwind (có thể thay bằng icon library)
const DefaultSpinner = () => (
  <svg aria-hidden='true' className='animate-spin -ml-1 mr-2 h-4 w-4 text-current' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
    <path
      className='opacity-75'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      fill='currentColor'
    />
  </svg>
)

const MyButton = ({
  color = 'default',
  size = 'default',
  variant = '',
  className,
  disabled,
  isLoading = false,
  spinner,
  children,
  onClick,
  type = 'button',
  ...props
}: Props) => {
  // Khi loading thì disable button và ignore onClick
  const isDisabled = disabled || isLoading

  return (
    <button
      className={cn(
        // Base styles
        'inline-flex  items-center justify-center rounded-md px-4 py-2',
        // 'focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Color variants
        getClassColor(color),
        // Disabled/Loading state
        isDisabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer ',
        // Custom className from props
        className
      )}
      disabled={isDisabled}
      type={type}
      onClick={isLoading ? undefined : onClick}
      {...props}
    >
      {/* Spinner khi loading */}
      {isLoading && (spinner || <DefaultSpinner />)}

      {children}
    </button>
  )
}

export default MyButton
