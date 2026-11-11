import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'danger' | 'info' | 'neutral'
export type ButtonVariant = 'solid' | 'flat' | 'outline' | 'ghost' | 'light' | 'link' | 'soft' | 'dash'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'

type Props = {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  spinner?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  fullWidth?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  children?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

// daisyUI color class per semantic color (danger is an alias of error)
const COLOR_CLASS: Record<ButtonColor, string> = {
  default: 'btn-primary',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  danger: 'btn-error',
  neutral: 'btn-neutral',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  default: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

const RADIUS_CLASS: Record<NonNullable<Props['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-field',
  lg: 'rounded-box',
  full: 'rounded-full',
}

// Variants map onto daisyUI style modifiers; flat/light become soft/ghost
const VARIANT_CLASS: Partial<Record<ButtonVariant, string>> = {
  solid: '',
  flat: 'btn-soft',
  soft: 'btn-soft',
  outline: 'btn-outline',
  dash: 'btn-dash',
  ghost: 'btn-ghost',
  light: 'btn-ghost',
  link: 'btn-link',
}

const MyButton = ({
  color = 'default',
  variant = 'solid',
  size = 'md',
  radius,
  className,
  disabled,
  isLoading = false,
  spinner,
  startContent,
  endContent,
  fullWidth,
  children,
  type = 'button',
  onClick,
  ...props
}: Props) => {
  const isDisabled = disabled || isLoading
  const isNeutralLook = variant === 'ghost' || variant === 'light' || variant === 'link'

  return (
    <button
      className={cn(
        'btn',
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        // ghost/link already carry their own look, a color class would fight it
        !isNeutralLook && COLOR_CLASS[color],
        isNeutralLook && color !== 'default' && COLOR_CLASS[color],
        radius && RADIUS_CLASS[radius],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      type={type}
      onClick={isLoading ? undefined : onClick}
      {...props}
    >
      {isLoading ? (spinner ?? <span className='loading loading-spinner loading-sm' />) : startContent}
      {children}
      {!isLoading && endContent}
    </button>
  )
}

export default MyButton
