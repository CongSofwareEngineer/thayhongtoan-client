import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import ClientApi from '@/services/ClientApi/index'
import { IClientApi } from '@/services/ClientApi/type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
const getAllProduct = async ({
  queryKey,
  pageParam,
}: {
  queryKey: string[]
  pageParam: number
}): Promise<{
  data: IClientApi['comment'][]
  page: number
}> => {
  const queryUrl = `${queryKey[1]}?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`

  const dataServer = await ClientApi.getCommentById(queryUrl)

  return {
    data: dataServer,
    page: pageParam,
  }
}
const useComment = (isProduct = '') => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetCommentProduction, isProduct],
    initialPageParam: 1,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading: isLoading,
    isFetchingNextPage,
    loadMore: fetchNextPage,
    hasNextPage,
  }
}

export default useComment
