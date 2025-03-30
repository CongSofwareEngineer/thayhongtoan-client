import React from 'react'
import { useModalAdmin as useModalAdminZustand } from '@/zustand/useModalAdmin'
import { AiOutlineClose } from 'react-icons/ai'
import { cn } from '@/utils/tailwind'

const MyModalAdmin = () => {
  const { modalAdmin, closeModal } = useModalAdminZustand()

  const onClick = (event: any) => {
    if (event.target === event.currentTarget) {
      if (modalAdmin.overClickClose) {
        closeModal(true)
      }
    }
  }

  const getPosition = () => {
    switch (modalAdmin?.position) {
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
    switch (modalAdmin?.position) {
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

  return modalAdmin.body ? (
    <div
      onClick={onClick}
      className='fixed z-[9999999] flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-black/20 '
      style={{
        backdropFilter: 'blur(5px)',
        ...getPosition(),
      }}
    >
      <div
        className={cn(
          'md:w-[500px] w-[90dvw] animate-zoom  transition-all duration-500 relative flex flex-col justify-center items-center bg-white rounded-xl p-5',
          modalAdmin.className
        )}
        style={getPositionBody()}
      >
        {modalAdmin.showBtnClose && (
          <div className='absolute z-10 text-xl right-5 top-5 flex justify-end'>
            <AiOutlineClose className='cursor-pointer' onClick={() => closeModal(true)} />
          </div>
        )}
        {modalAdmin.title && (
          <div className='text-medium mb-2 font-bold w-full'>{modalAdmin.title}</div>
        )}
        {modalAdmin.body}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default MyModalAdmin
