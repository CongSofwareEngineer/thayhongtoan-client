'use client'
import React, { ReactNode, SelectHTMLAttributes, useId } from 'react'

import { cn } from '@/utils/tailwind'

export type OptionSelect = Array<{ label: ReactNode; key: string }>

export type MySelectProps = {
  options: OptionSelect
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  isInvalid?: boolean
  isRequired?: boolean
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  onValueChange?: (value: string) => void
  classNames?: {
    base?: string
    label?: string
    select?: string
  }
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'>

const SIZE_CLASS = {
  xs: 'select-xs',
  sm: 'select-sm',
  md: '',
  lg: 'select-lg',
}

const MySelect = ({
  options,
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired,
  placeholder,
  size = 'md',
  onValueChange,
  onChange,
  className,
  classNames,
  ...props
}: MySelectProps) => {
  const autoId = useId()
  const selectId = props.id || autoId
  const showError = Boolean(errorMessage) || isInvalid

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classNames?.base, className)}>
      {label && (
        <label className={cn('text-sm font-semibold text-base-content', classNames?.label)} htmlFor={selectId}>
          {label}
          {isRequired && <span className='ml-0.5 text-error'>*</span>}
        </label>
      )}

      <select
        {...props}
        className={cn('select w-full bg-base-100', SIZE_CLASS[size], showError && 'select-error', classNames?.select)}
        id={selectId}
        required={isRequired}
        onChange={(e) => {
          onChange?.(e)
          onValueChange?.(e.target.value)
        }}
      >
        {placeholder && (
          <option disabled value=''>
            {placeholder}
          </option>
        )}
        {options.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>

      {showError && errorMessage ? (
        <p className='text-xs font-medium text-error'>{errorMessage}</p>
      ) : (
        description && <p className='text-xs text-base-content/60'>{description}</p>
      )}
    </div>
  )
}

export default MySelect
