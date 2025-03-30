import useMedia from '@/hooks/useMedia'
import React from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

type SubAndPlusType = {
  callBackSub?: (value: number) => void
  callBackPlus?: (value: number) => void
  value: number | string
  maxAmount?: number
  isSquare?: boolean
}
const SubAndPlus = ({
  callBackSub = () => {},
  callBackPlus = () => {},
  value = 0,
  maxAmount = -1,
  isSquare = false,
}: SubAndPlusType) => {
  const { isMobile } = useMedia()
  return (
    <div className='flex align-middle gap-3  '>
      {isSquare ? (
        <div className='flex  border-solid border-2 border-gray-400 rounded-lg md:py-1 py-[2px]'>
          <div
            className='font-bold relative  cursor-pointer text-center  min-w-5'
            onClick={() => callBackSub(value === 1 ? 1 : Number(value) - 1)}
          >
            -
          </div>
          <div className='cursor-pointer text-center md:min-w-12 min-w-8 '>{value || 1}</div>
          <div
            className='relative font-bold cursor-pointer text-center   min-w-5'
            onClick={() =>
              callBackPlus(
                maxAmount === -1
                  ? Number(value) + 1
                  : maxAmount === Number(value)
                    ? Number(value)
                    : Number(value) + 1
              )
            }
          >
            +
          </div>
        </div>
      ) : (
        <>
          <AiOutlineMinusCircle
            onClick={() => callBackSub(value === 1 ? 1 : Number(value) - 1)}
            className='cursor-pointer'
            style={{ fontSize: isMobile ? 22 : 25, color: 'green' }}
          />
          <span className='min-w-[22px] text-center '>{value}</span>

          <AiOutlinePlusCircle
            className='cursor-pointer'
            onClick={() =>
              callBackPlus(
                maxAmount === -1
                  ? Number(value) + 1
                  : maxAmount === Number(value)
                    ? Number(value)
                    : Number(value) + 1
              )
            }
            style={{ fontSize: isMobile ? 22 : 25, color: 'green' }}
          />
        </>
      )}
    </div>
  )
}

export default SubAndPlus
