'use client'
import React, { ReactNode, TextareaHTMLAttributes, useId } from 'react'

import { cn } from '@/utils/tailwind'

export type MyInputAreaProps = {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  isInvalid?: boolean
  isRequired?: boolean
  minRows?: number
  onValueChange?: (value: string) => void
  classNames?: {
    base?: string
    label?: string
    input?: string
  }
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const MyInputArea = ({
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired,
  minRows = 3,
  onValueChange,
  onChange,
  className,
  classNames,
  ...props
}: MyInputAreaProps) => {
  const autoId = useId()
  const inputId = props.id || autoId
  const showError = Boolean(errorMessage) || isInvalid

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classNames?.base, className)}>
      {label && (
        <label className={cn('text-sm font-semibold text-base-content', classNames?.label)} htmlFor={inputId}>
          {label}
          {isRequired && <span className='ml-0.5 text-error'>*</span>}
        </label>
      )}

      <textarea
        {...props}
        className={cn('textarea w-full bg-base-100', showError && 'textarea-error', classNames?.input)}
        id={inputId}
        required={isRequired}
        rows={props.rows ?? minRows}
        onChange={(e) => {
          onChange?.(e)
          onValueChange?.(e.target.value)
        }}
      />

      {showError && errorMessage ? (
        <p className='text-xs font-medium text-error'>{errorMessage}</p>
      ) : (
        description && <p className='text-xs text-base-content/60'>{description}</p>
      )}
    </div>
  )
}

export default MyInputArea
