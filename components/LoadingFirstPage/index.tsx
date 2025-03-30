'use client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'

const LoadingFirstPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? (
    <></>
  ) : (
    <div className='bg-white z-[999999999] flex w-screen h-screen fixed justify-center items-center inset-0'>
      <AiOutlineLoading3Quarters
        style={{ color: 'green' }}
        className='text-[40px] animation_spin1s '
      />
    </div>
  )
}

export default LoadingFirstPage
