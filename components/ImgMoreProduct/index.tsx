import React, { useState } from 'react'
import { detectImg } from '@/utils/functions'
import MyImage from '../MyImage'
import useLanguage from '@/hooks/useLanguage'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import useMedia from '@/hooks/useMedia'
import { LuEye } from 'react-icons/lu'

const ImgCustom = ({ src }: { src: string }) => {
  const { translate } = useLanguage()
  const { openModal } = useModalAdmin()
  const [srcHover, setSrcHover] = useState('')
  const { isMobile } = useMedia()

  const handleViewFull = (src: string = '') => {
    openModal({
      body: (
        <div className='w-[90%] flex justify-center items-center h-[90%]'>
          <MyImage
            alt={src}
            className='!w-auto !h-full !max-w-full !max-h-full'
            src={detectImg(src || srcHover)}
          />
        </div>
      ),

      className: '!md:min-h-[500px] !min-h-[300px]',
    })
  }
  return (
    <div
      className='w-full h-full relative'
      onMouseLeave={() => setSrcHover('')}
      onMouseOver={() => {
        setSrcHover(src)
      }}
      onClick={() => {
        handleViewFull(src)
      }}
    >
      <MyImage alt={src} src={detectImg(src)} />
      {srcHover && !isMobile && (
        <div className='absolute-center transition-all duration-200 flex justify-center items-center w-full h-full bg-black/50 cursor-pointer text-white inset-0'>
          <div
            onClick={() => handleViewFull('')}
            className='text-xs  m-auto flex items-center gap-1'
          >
            <LuEye />
            <div>{translate('common.view')}</div>
          </div>
        </div>
      )}
    </div>
  )
}
const ImgMoreProduct = ({
  data,
  onHover = () => {},
}: {
  data: any
  onHover?: (param?: string) => void
}) => {
  return data?.imageMore?.length > 1 ? (
    // <div className="absolute bottom-0 ">
    <div className='mt-2'>
      <div className='flex w-full overflow-x-auto gap-2 pb-2'>
        {data.imageMore.map((e: string) => {
          return (
            <div
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
              }}
              className='flex relative shadow-inner md:w-[60px] w-10 aspect-square  md:h-[60px] h-10'
              key={e}
              onMouseLeave={() => onHover('')}
              onMouseOver={() => {
                onHover(e)
              }}
              onClick={() => {
                onHover(e)
              }}
            >
              <ImgCustom src={detectImg(e)} />
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ImgMoreProduct
