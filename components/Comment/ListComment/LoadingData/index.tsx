import MySkeleton from '@/components/MySkeleton'
import React from 'react'

const LoadingData = ({ loading }: { loading: boolean }) => {
  if (!loading) {
    return <></>
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <MySkeleton className='flex gap-2 w-full md:p-5 p-3'>
        <MySkeleton className='md:w-[200px] w-[80px] rounded-lg aspect-square' />
        <div className='flex justify-center flex-1 flex-col gap-2'>
          <MySkeleton className='md:min-w-[100px] rounded-lg min-w-full md:h-10 h-5' />
          <MySkeleton className='md:min-w-[100px] rounded-lg min-w-full md:h-7 h-5' />
          <MySkeleton className='md:min-w-[100px] rounded-lg min-w-full md:h-7 h-5' />
        </div>
      </MySkeleton>
    </div>
  )
}

export default LoadingData
