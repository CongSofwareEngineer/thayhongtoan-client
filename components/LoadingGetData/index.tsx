import useMedia from '@/hooks/useMedia'
import React, { useEffect, useState } from 'react'
import MySkeleton from '../MySkeleton'

type Props = {
  colDesktop?: number
  colSurface?: number
  colTablet?: number
  colMobile?: number
  minWidthSurface?: number
  minWidthTablet?: number
  minWidthMobile?: number
  loading?: boolean
  rows?: number
  children?: React.ReactNode
}

const LoadingGetData = ({
  loading = false,
  colDesktop = 4,
  colSurface = 4,
  colMobile = 2,
  colTablet = 3,
  minWidthSurface = 1024,
  minWidthMobile = 568,
  minWidthTablet = 768,
  rows = 1,
  children,
}: Props) => {
  const { isMobile: isSurface } = useMedia(minWidthSurface)
  const { isMobile: isTablet } = useMedia(minWidthTablet)

  const { isMobile } = useMedia(minWidthMobile)
  const [arrClo, setArrClo] = useState<string[]>([])

  useEffect(() => {
    let amountCol = colDesktop
    if (isSurface) {
      amountCol = colSurface
    }
    if (isTablet) {
      amountCol = colTablet
    }
    if (isMobile) {
      amountCol = colMobile
    }
    const arrInit: string[] = []

    for (let index = 0; index < amountCol * rows; index++) {
      arrInit.push(`col-${amountCol}-${index}`)
    }
    setArrClo(arrInit)
  }, [colTablet, isSurface, isTablet, isMobile, colMobile, colDesktop, colSurface, rows])

  if (!loading) {
    return <></>
  }

  return (
    <div
      className='grid md:gap-3 gap-3 w-full'
      style={{ gridTemplateColumns: `repeat(${arrClo.length / rows}, minmax(0, 1fr))` }}
    >
      {arrClo.map((e) => {
        return children ? (
          <React.Fragment key={e}>{children}</React.Fragment>
        ) : (
          <MySkeleton
            key={e}
            className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'
          >
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
        )
      })}
    </div>
  )
}

export default LoadingGetData
