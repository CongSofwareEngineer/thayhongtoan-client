'use client'
import React, { ReactNode, useId } from 'react'

import { cn } from '@/utils/tailwind'

export type MyInputNumberProps = {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  isInvalid?: boolean
  isRequired?: boolean
  value?: number
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
  name?: string
  id?: string
  className?: string
  formatComma?: boolean
  endContent?: ReactNode
  onChange?: (value: number) => void
}

// Keep only digits and a single decimal separator, then return a number
const parseNumber = (raw: string): number => {
  let value = raw.replace(/,/g, '.').replace(/[^\d.]/g, '')
  const firstDot = value.indexOf('.')

  if (firstDot !== -1) {
    value = value.slice(0, firstDot + 1) + value.slice(firstDot + 1).replace(/\./g, '')
  }
  if (value.startsWith('.')) {
    value = '0' + value
  }

  return Number(value || '0')
}

const MyInputNumber = ({
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired,
  value,
  min,
  max,
  step = 1,
  placeholder,
  disabled,
  name,
  id,
  className,
  formatComma = false,
  endContent,
  onChange,
}: MyInputNumberProps) => {
  const autoId = useId()
  const inputId = id || autoId
  const showError = Boolean(errorMessage) || isInvalid

  const display = typeof value === 'number' && !Number.isNaN(value) ? (formatComma ? value.toLocaleString('vi-VN') : String(value)) : ''

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label className='text-sm font-semibold text-base-content' htmlFor={inputId}>
          {label}
          {isRequired && <span className='ml-0.5 text-error'>*</span>}
        </label>
      )}

      <label className={cn('input w-full items-center gap-2 bg-base-100', showError && 'input-error', disabled && 'opacity-60')}>
        <input
          className='grow bg-transparent outline-none'
          disabled={disabled}
          id={inputId}
          inputMode='decimal'
          max={max}
          min={min}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          step={step}
          type='text'
          value={display}
          onChange={(e) => onChange?.(parseNumber(e.target.value))}
        />
        {endContent && <span className='shrink-0 text-sm opacity-60'>{endContent}</span>}
      </label>

      {showError && errorMessage ? (
        <p className='text-xs font-medium text-error'>{errorMessage}</p>
      ) : (
        description && <p className='text-xs text-base-content/60'>{description}</p>
      )}
    </div>
  )
}

export default MyInputNumber
