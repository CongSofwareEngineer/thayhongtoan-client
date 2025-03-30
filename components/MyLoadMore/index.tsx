import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mantine/core'

type Props = {
  hasLoadMore?: boolean
  title?: string
  callback?: () => any
  loading?: boolean
  isFetchingNextPage?: boolean
}
const MyLoadMore = ({
  loading = false,
  hasLoadMore = false,
  isFetchingNextPage = false,
  title = '',
  callback,
}: Props) => {
  const { translate } = useLanguage()
  return !loading && hasLoadMore ? (
    <div className='mt-4 w-full flex justify-center items-center'>
      <Button onClick={callback} loading={isFetchingNextPage}>
        {title || translate('textPopular.loadMore')}
      </Button>
    </div>
  ) : (
    <></>
  )
}

export default MyLoadMore
