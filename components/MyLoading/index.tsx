import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type MyLoadingType = {
  className?: string
  size?: any
}
const MyLoading = ({ className, size = 36 }: MyLoadingType) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className='my-5 text-2xl text-green-500'>
        <AiOutlineLoading3Quarters className='animation_spin1s' style={{ fontSize: size }} />
      </div>
    </div>
  )
}

export default MyLoading
