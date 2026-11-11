'use client'
import { useEffect } from 'react'

import { XMarkIcon } from '../Icons/XMark'

import useModal from '@/hooks/useModal'
import { cn } from '@/utils/tailwind'
import { ModalSize } from '@/zustand/modal'

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-[95vw]',
}

const PLACEMENT_CLASS = {
  center: 'modal-middle',
  top: 'modal-top',
  bottom: 'modal-bottom',
}

const MyModal = () => {
  const { listModals, closeModal } = useModal()
  const hasModal = listModals.length > 0

  // Lock page scroll while any modal is open
  useEffect(() => {
    if (hasModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [hasModal])

  // ESC closes the top-most modal
  useEffect(() => {
    if (!hasModal) {
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasModal, closeModal])

  if (!hasModal) {
    return null
  }

  return (
    <>
      {listModals.map((modal, index) => {
        const showBtnClose = modal.showBtnClose !== false
        const overClickClose = modal.overClickClose !== false

        return (
          <div
            key={`modal-${index}`}
            aria-modal
            className={cn('modal modal-open', PLACEMENT_CLASS[modal.placement || 'center'], modal.classNames?.backdrop)}
            role='dialog'
            style={{ zIndex: 1000 + index }}
          >
            <div className={cn('modal-box w-full animate-zoom p-0', SIZE_CLASS[modal.size || 'md'], modal.classNames?.base)}>
              {(modal.title || showBtnClose) && (
                <div className={cn('flex items-start justify-between gap-4 border-b border-base-300 px-5 py-4', modal.classNames?.header)}>
                  <h3 className='text-lg font-bold text-base-content'>{modal.title}</h3>
                  {showBtnClose && (
                    <button aria-label='close' className='btn btn-circle btn-ghost btn-sm' type='button' onClick={() => closeModal(true)}>
                      <XMarkIcon />
                    </button>
                  )}
                </div>
              )}
              <div className={cn('max-h-[75vh] overflow-y-auto px-5 py-4', modal.classNames?.body)}>{modal.children}</div>
            </div>
            {overClickClose && (
              <button aria-label='close modal' className='modal-backdrop cursor-default' type='button' onClick={() => closeModal()} />
            )}
          </div>
        )
      })}
    </>
  )
}

export default MyModal
