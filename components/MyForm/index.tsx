'use client'
import React, { FormHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  // Receives the form values as a plain object (FormData entries)
  onSubmit?: (data: Record<string, any>, event: React.FormEvent<HTMLFormElement>) => any
}

const MyForm = ({ onSubmit, className, children, ...props }: Props) => {
  return (
    <form
      {...props}
      className={cn('flex w-full flex-col gap-4', className)}
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))

        onSubmit?.(data, e)
      }}
    >
      {children}
    </form>
  )
}

export default MyForm
