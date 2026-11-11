'use client'
import React, { InputHTMLAttributes, ReactNode, useId } from 'react'

import { cn } from '@/utils/tailwind'

export type MyCheckboxProps = {
  children?: ReactNode
  isSelected?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  onValueChange?: (checked: boolean) => void
  classNames?: { base?: string; label?: string; input?: string }
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color' | 'type'>

const SIZE_CLASS = { xs: 'checkbox-xs', sm: 'checkbox-sm', md: '', lg: 'checkbox-lg' }

const MyCheckbox = ({
  children,
  isSelected,
  color = 'primary',
  size = 'md',
  onValueChange,
  onChange,
  className,
  classNames,
  ...props
}: MyCheckboxProps) => {
  const autoId = useId()
  const id = props.id || autoId

  return (
    <label className={cn('flex cursor-pointer items-center gap-2', classNames?.base, className)} htmlFor={id}>
      <input
        {...props}
        checked={typeof isSelected === 'boolean' ? isSelected : props.checked}
        className={cn('checkbox', `checkbox-${color}`, SIZE_CLASS[size], classNames?.input)}
        id={id}
        type='checkbox'
        onChange={(e) => {
          onChange?.(e)
          onValueChange?.(e.target.checked)
        }}
      />
      {children && <span className={cn('select-none text-sm text-base-content', classNames?.label)}>{children}</span>}
    </label>
  )
}

export default MyCheckbox
