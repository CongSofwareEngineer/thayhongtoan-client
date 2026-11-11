'use client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

import { images } from '@/config/images'
import { cn } from '@/utils/tailwind'

type Props = {
  /** skip the fade-in, e.g. for logos that must not flicker */
  noAnimation?: boolean
} & Omit<ImageProps, 'alt' | 'src'> & {
    alt?: string
    src?: string
  }

/**
 * Thin wrapper over next/image: native lazy loading, a local skeleton while the
 * file is in flight, and a safe fallback when the source is broken.
 */
const MyImage = ({ noAnimation = false, src, alt = 'thay-hong-toan', ...props }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const isSettled = loaded || failed || noAnimation

  return (
    <Image
      fill
      alt={alt}
      draggable={false}
      loading={props.priority ? undefined : 'lazy'}
      sizes='(max-width: 768px) 100vw, 50vw'
      {...props}
      className={cn('!relative overflow-hidden', props?.className)}
      src={failed ? images.icons.avatarDefault : src || images.icons.avatarDefault}
      style={{
        // Tinted box while the file is in flight; the image paints over it
        backgroundColor: isSettled ? undefined : 'var(--color-base-200)',
        filter: isSettled ? 'none' : 'blur(12px)',
        transition: 'filter 0.2s ease-out',
        ...props.style,
      }}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default MyImage
