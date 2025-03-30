import React from 'react'
import { formatDateTime } from '@/utils/momentFunc'
import { IContentItemChat } from './type'
import useRoutePage from '@/hooks/useRoutePage'

const ItemChatDetail = ({ data }: { data: IContentItemChat }) => {
  const router = useRoutePage()

  const renderContent = (content: string) => {
    if (!content.includes(' ') && content.includes('https')) {
      return <div onClick={() => router.push(content)}>{content}</div>
    }
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    )
  }
  return (
    <div
      key={data.date}
      className='flex w-full'
      style={{
        justifyContent: data.isAdmin ? 'start' : 'end',
      }}
    >
      <div
        style={{
          borderRadius: 8,
          borderBottomLeftRadius: data.isAdmin ? 0 : 8,
          borderBottomRightRadius: !data.isAdmin ? 0 : 8,
        }}
        className='px-3 break-all  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
      >
        {renderContent(data.content)}
        <div
          style={{
            textAlign: data?.isAdmin ? 'start' : 'end',
          }}
          className='text-[9px] opacity-70 mt-1'
        >
          {formatDateTime(data.date)}
        </div>
      </div>
    </div>
  )
}

export default ItemChatDetail
