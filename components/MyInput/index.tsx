'use client'
import React, { InputHTMLAttributes, ReactNode, useId, useState } from 'react'

import { EyeSlashIcon } from '../Icons/EyeSlash'
import { EyeIcon } from '../Icons/Eye'

import { cn } from '@/utils/tailwind'

export type MyInputProps = {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  isInvalid?: boolean
  isRequired?: boolean
  startContent?: ReactNode
  endContent?: ReactNode
  onValueChange?: (value: string) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  classNames?: {
    base?: string
    label?: string
    wrapper?: string
    input?: string
  }
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

const SIZE_CLASS = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: '',
  lg: 'input-lg',
}

const MyInput = ({
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired,
  startContent,
  endContent,
  onValueChange,
  onChange,
  size = 'md',
  className,
  classNames,
  type = 'text',
  ...props
}: MyInputProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const autoId = useId()
  const inputId = props.id || autoId
  const isPassword = type === 'password'
  const showError = Boolean(errorMessage) || isInvalid

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classNames?.base, className)}>
      {label && (
        <label className={cn('text-sm font-semibold text-base-content', classNames?.label)} htmlFor={inputId}>
          {label}
          {isRequired && <span className='ml-0.5 text-error'>*</span>}
        </label>
      )}

      <label
        className={cn(
          'input w-full items-center gap-2 bg-base-100',
          SIZE_CLASS[size],
          showError && 'input-error',
          props.disabled && 'opacity-60',
          classNames?.wrapper
        )}
      >
        {startContent && <span className='shrink-0 opacity-60'>{startContent}</span>}
        <input
          {...props}
          className={cn('grow bg-transparent outline-none', classNames?.input)}
          id={inputId}
          required={isRequired}
          type={isPassword ? (isVisible ? 'text' : 'password') : type}
          onChange={(e) => {
            onChange?.(e)
            onValueChange?.(e.target.value)
          }}
        />
        {isPassword ? (
          <button
            aria-label={isVisible ? 'hide password' : 'show password'}
            className='shrink-0 cursor-pointer opacity-60 hover:opacity-100'
            tabIndex={-1}
            type='button'
            onClick={() => setIsVisible((v) => !v)}
          >
            {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        ) : (
          endContent && <span className='shrink-0 opacity-60'>{endContent}</span>
        )}
      </label>

      {showError && errorMessage ? (
        <p className='text-xs font-medium text-error'>{errorMessage}</p>
      ) : (
        description && <p className='text-xs text-base-content/60'>{description}</p>
      )}
    </div>
  )
}

export default MyInput
