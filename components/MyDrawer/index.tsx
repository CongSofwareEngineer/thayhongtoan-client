'use client'
import React, { useEffect } from 'react'

import { XMarkIcon } from '../Icons/XMark'

import { drawer as drawerZustand, DrawerPlacement } from '@/zustand/drawer'
import { cn } from '@/utils/tailwind'

const PANEL_CLASS: Record<DrawerPlacement, string> = {
  left: 'inset-y-0 left-0 h-full w-[82vw] max-w-sm',
  right: 'inset-y-0 right-0 h-full w-[82vw] max-w-sm',
  top: 'inset-x-0 top-0 w-full max-h-[85vh]',
  bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-box',
}

const ENTER_CLASS: Record<DrawerPlacement, string> = {
  left: 'animate-[slide-in-left_0.25s_ease-out]',
  right: 'animate-[slide-in-right_0.25s_ease-out]',
  top: 'animate-[slide-in-top_0.25s_ease-out]',
  bottom: 'animate-[slide-in-bottom_0.25s_ease-out]',
}

const MyDrawer = () => {
  const { drawer, closeDrawer } = drawerZustand((state) => state)
  const isOpen = Boolean(drawer?.isOpen)
  const placement = drawer?.placement || 'right'

  // Lock page scroll + close on ESC while the drawer is open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty('overflow')

      return undefined
    }

    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.removeProperty('overflow')
    }
  }, [isOpen, closeDrawer])

  if (!isOpen) {
    return null
  }

  const showBtnClose = drawer?.showBtnClose !== false
  const overClickClose = drawer?.overClickClose !== false

  return (
    <div className='fixed inset-0 z-[1100]'>
      <button
        aria-label='close drawer'
        className={cn('absolute inset-0 w-full cursor-default bg-neutral/40 backdrop-blur-[2px]', drawer?.classNames?.backdrop)}
        type='button'
        onClick={() => overClickClose && closeDrawer()}
      />
      <aside
        className={cn(
          'absolute flex flex-col overflow-hidden bg-base-100 shadow-2xl',
          PANEL_CLASS[placement],
          ENTER_CLASS[placement],
          drawer?.classNames?.base
        )}
      >
        <div className={cn('flex items-center justify-between gap-3 border-b border-base-300 px-4 py-3', drawer?.classNames?.header)}>
          <h3 className='text-base font-bold text-base-content'>{drawer?.title}</h3>
          {showBtnClose && (
            <button aria-label='close' className='btn btn-circle btn-ghost btn-sm' type='button' onClick={() => closeDrawer(true)}>
              <XMarkIcon />
            </button>
          )}
        </div>
        <div className={cn('flex-1 overflow-y-auto p-4', drawer?.classNames?.body)}>{drawer?.children}</div>
      </aside>
    </div>
  )
}

export default MyDrawer
