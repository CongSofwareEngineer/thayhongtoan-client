import useMedia from '@/hooks/useMedia'
import React, { useEffect } from 'react'

const MyCollections = ({
  children,
  isClickItem,
}: {
  children: React.ReactNode
  isClickItem: any
}) => {
  // const refScroll = useRef(null)
  // const isClickRoutePageRef = useRef(false)
  const { isMobile } = useMedia()

  useEffect(() => {
    const slider: any = document.querySelector('#listCollection')

    let isDown = false
    let startX: any
    let scrollLeft: any
    if (slider) {
      slider.addEventListener('mousedown', (e: any) => {
        isDown = true
        slider.classList.add('active')
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
        isClickItem.current = true
      })
      slider.addEventListener('mouseleave', () => {
        if (isDown) {
          isClickItem.current = false
        }
        isDown = false
        slider.classList.remove('active')
      })

      slider.addEventListener('mouseup', () => {
        isDown = false
        slider.classList.remove('active')
      })
      slider.addEventListener('mousemove', (e: any) => {
        if (isDown) {
          isClickItem.current = false
        }
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = x - startX // scroll-fast
        slider.scrollLeft = scrollLeft - walk
      })
      slider.addEventListener('scroll', (e: any) => {
        if (isDown) {
          isClickItem.current = false
        }
        // get position scroll :e.target.scrollLeft
        // width component can have  view : slider.clientWidth
        // width component: slider.scrollWidth
        if (slider.scrollWidth - e.target.scrollLeft < slider.clientWidth + 200) {
          // console.log('have load more')
        }
      })
    }
    if (isMobile) {
      isClickItem.current = true
    }
  }, [isMobile, isClickItem])

  return (
    <div id='listCollection' className='flex md:gap-4 gap-3 w-full overflow-y-auto py-3'>
      {children}
    </div>
  )
}

export default MyCollections
