import { images } from '@/configs/images'
import { cn } from '@/utils/tailwind'
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

type IImage = {
  onLoaded?: () => any
  showPreView?: boolean
} & ImageProps
const MyImage = ({ ...props }: IImage) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true, rootMargin: '150px' })
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      draggable={false}
      ref={ref}
      fill
      {...props}
      onLoad={() => {
        setLoaded(true)
        if (props.onLoaded) {
          props.onLoaded()
        }
      }}
      className={cn('!relative', props?.className)}
      style={{
        filter: loaded ? 'none' : 'blur(20px)',
        transition: 'filter 0.08s ease-out',
        ...props.style,
      }}
      src={
        inView
          ? props.src
          : 'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'
      }
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = images.icon.unknowTokenIcon
      }}
    />
  )
}

export default MyImage
