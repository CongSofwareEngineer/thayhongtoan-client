import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import dynamic from 'next/dynamic'
import MyLoading from '../MyLoading'
import MyTabs, { MyTabsProps } from '../MyTabs'

const MyBlog = dynamic(() => import('@/components/MyBlog'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const Comment = dynamic(() => import('@/components/Comment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const MoreInfo = ({ data }: { data: any }) => {
  const { translate } = useLanguage()

  const checkMyBlog = () => {
    try {
      return Object.keys(JSON.parse(data?.des2 || '{}')).length > 1
    } catch {
      return false
    }
  }

  const items: MyTabsProps['data'] = [
    {
      key: 'info',
      label: <div className='font-bold'>{translate('textPopular.infor')}</div>,
      children: (
        <>
          {checkMyBlog() ? (
            <MyBlog className='!p-0' value={JSON.parse(data?.des2 || '{}')} disabled />
          ) : (
            <div className='pt-3'>{translate('warning.noData')}</div>
          )}
        </>
      ),
    },
    {
      key: 'Comment',
      label: <div className='font-bold'>{translate('textPopular.comment')}</div>,
      children: <Comment dataItem={data} />,
    },
  ]

  return <MyTabs data={items} />
}

export default MoreInfo
