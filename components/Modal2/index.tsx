'use client'
import React, { useEffect } from 'react'

import { XMarkIcon } from '../Icons/XMark'

import { cn } from '@/utils/tailwind'
import useModal2 from '@/hooks/useModal2'

const Modal2 = () => {
  const { modal2, closeModal } = useModal2()

  useEffect(() => {
    if (modal2.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [modal2])

  useEffect(() => {
    if (modal2?.open && modal2.maskClose) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
          closeModal()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', () => {})
    }
  }, [modal2, closeModal])

  const onClick = (event: any) => {
    if (event.target === event.currentTarget) {
      if (modal2.maskClose) {
        closeModal(true)
      }
    }
  }

  const getPosition = () => {
    switch (modal2?.position) {
      case 'center':
        return {
          alignItems: 'center',
          justifyContent: 'center',
        }

      case 'top-left':
        return {}

      case 'top-right':
        return { alignItems: 'end' }

      case 'bottom-left':
        return { justifyContent: 'end' }

      default:
        return { alignItems: 'end', justifyContent: 'end' }
    }
  }

  const getPositionBody = () => {
    switch (modal2?.position) {
      case 'center':
        return {}

      case 'top-left':
        return {
          top: 20,
          left: 20,
        }

      case 'top-right':
        return {
          top: 20,
          right: 20,
        }

      case 'bottom-left':
        return {
          bottom: 20,
          left: 20,
        }

      default:
        return { bottom: 20, right: 20 }
    }
  }

  return modal2?.open ? (
    <div
      className={cn(
        'fixed  flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-neutral/40 ',
        modal2?.open ? 'z-[9999999] opacity-100' : 'z-[-1] opacity-0'
      )}
      style={{
        backdropFilter: 'blur(5px)',
        ...getPosition(),
      }}
      onClick={onClick}
    >
      <div
        className={cn(
          'md:w-[500px] w-[90dvw]  transition-all duration-500 relative flex flex-col justify-center items-center bg-base-100 rounded-box p-5 shadow-2xl',
          modal2?.open ? 'animate-zoom ' : ' ',
          modal2.className
        )}
        style={getPositionBody()}
      >
        {modal2.showBtnClose && (
          <div className='absolute z-10 text-xl right-5 top-5 flex justify-end'>
            <XMarkIcon className='cursor-pointer' onClick={() => closeModal(true)} />
          </div>
        )}
        {modal2.title && <div className='text-medium mb-2 font-bold w-full'>{modal2.title}</div>}
        {modal2.content}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Modal2
