'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/tailwind'

export type OptionDropdown = Array<{ label: ReactNode; key: string; icon?: ReactNode; danger?: boolean }>

type Props = {
  options: OptionDropdown
  children?: ReactNode
  placement?: 'start' | 'center' | 'end'
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  classNameContent?: string
  onAction?: (key: string) => void
}

const MyDropdown = ({ options, children, placement = 'end', direction = 'bottom', className, classNameContent, onAction }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking anywhere outside the dropdown
  useEffect(() => {
    if (!open) {
      return
    }

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)

    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  return (
    <div ref={ref} className={cn('dropdown', `dropdown-${placement}`, `dropdown-${direction}`, open && 'dropdown-open', className)}>
      <div role='button' tabIndex={0} onClick={() => setOpen((v) => !v)}>
        {children}
      </div>
      {open && (
        <ul className={cn('dropdown-content menu z-50 mt-2 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg', classNameContent)}>
          {options.map((item) => (
            <li key={item.key}>
              <button
                className={cn('flex items-center gap-2 text-left', item.danger && 'text-error')}
                type='button'
                onClick={() => {
                  setOpen(false)
                  onAction?.(item.key)
                }}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyDropdown
