import React, { useLayoutEffect, useRef } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
type ChatMessageProps = {
  children?: React.ReactNode
  className?: string
  loadMore?: () => any
  isLoadMore?: boolean
  isReverse?: boolean
  loading?: boolean
  data?: any[]
}
const ChatMessage = ({
  children = null,
  isLoadMore = false,
  loading = false,
  loadMore = () => {},
  className = '',
  isReverse = true,
  data = [],
}: ChatMessageProps) => {
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: loading,
    hasNextPage: isLoadMore,
    onLoadMore: loadMore,
  })

  const scrollableRootRef = useRef<React.ComponentRef<'div'> | null>(null)
  const lastScrollDistanceToBottomRef = useRef<number>(0)

  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current

    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0

    if (scrollableRoot && isReverse) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom
    }
  }, [data, isReverse, rootRef])

  const rootRefSetter = (node: HTMLDivElement) => {
    rootRef(node)
    scrollableRootRef.current = node
  }

  const handleRootScroll = () => {
    const rootNode = scrollableRootRef.current
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom
    }
  }

  return (
    <div
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      className={`flex flex-col flex-1 min-h-full h-full overflow-y-auto ${className}`}
    >
      {isLoadMore && (
        <div ref={infiniteRef} className='flex w-full '>
          Loading....
        </div>
      )}
      {children}
    </div>
  )
}

export default ChatMessage
