import { Button, FileButton } from '@mantine/core'
import React, { useMemo } from 'react'
import CropImg from '../CropImg'
import { AiOutlineUpload } from 'react-icons/ai'
import { isIOS, isMacOs } from 'react-device-detect'
import { MAX_PIXEL_REDUCE } from '@/constants/app'
import { useModalAdmin } from '@/zustand/useModalAdmin'
type IUploadImage = {
  callback: (file: File) => any
  disabled?: boolean
  children?: React.ReactNode
  fullQuality?: boolean
  maxPixelReduce?: number
  maxSizeOutputKB?: number
}
const UploadImage = ({
  callback,
  children = null,
  disabled = false,
  maxSizeOutputKB = 15,
  fullQuality = false,
  maxPixelReduce = MAX_PIXEL_REDUCE,
}: IUploadImage) => {
  const { openModal, closeModal } = useModalAdmin()
  const typeFile = useMemo(() => {
    if (isIOS || isMacOs) {
      return 'image/*'
    }
    return '.png,.jpg,.jpeg,.gif,.svg'
  }, [])

  const handleUploadImg = (file: File | null) => {
    const callbackCrop = async (fileCrop: File | null) => {
      console.log({ fileCrop })

      callback(fileCrop as File)
      closeModal()
    }

    openModal({
      body: (
        <CropImg
          fullQuantity={fullQuality}
          maxScale={maxPixelReduce}
          maxSizeOutputKB={maxSizeOutputKB}
          onCropComplete={callbackCrop}
          file={file!}
        />
      ),
      title: 'Cắt ảnh',
      overClickClose: false,
      showBtnClose: false,
    })
  }

  return (
    <FileButton onChange={handleUploadImg} disabled={disabled} accept={typeFile}>
      {(props) => (
        <Button
          {...props}
          className='!p-0 !bg-transparent'
          style={{
            opacity: disabled ? 0.5 : 1,
          }}
          disabled={disabled}
        >
          {children || (
            <div className='text-white !text-2xl cursor-pointer transition-all duration-300 hover:!text-3xl'>
              <AiOutlineUpload />
            </div>
          )}
        </Button>
      )}
    </FileButton>
  )
}

export default UploadImage
