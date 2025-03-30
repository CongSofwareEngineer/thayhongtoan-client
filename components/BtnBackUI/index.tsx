import React from 'react'
import { images } from '@/configs/images'
import Image from 'next/image'
import { AiOutlineRight } from 'react-icons/ai'

type PropsType = {
  clickBack: () => void
  titlePageMain?: string
  titlePage?: string
}

const BtnBackUI = ({ clickBack, titlePageMain, titlePage }: PropsType) => {
  return (
    <div className='flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center '>
      <Image
        onClick={clickBack}
        src={images.icon.iconBack}
        alt={'TC Store Icon Back page '}
        className='cursor-pointer !relative !w-[25px] !h-[25px]'
        fill
      />
      {titlePageMain && (
        <a
          onClick={clickBack}
          className='cursor-pointer whitespace-nowrap hover:underline text-[16px] text-blue-700 flex gap-1'
        >
          <h2>{titlePageMain}</h2>
          <AiOutlineRight className='black' />
        </a>
      )}
      {titlePage && (
        <h1 className='whitespace-nowrap text-ellipsis overflow-hidden '>{titlePage}</h1>
      )}
    </div>
  )
}

export default BtnBackUI
