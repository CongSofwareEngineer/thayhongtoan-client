import useUserData from '../useUserData'
import { QUERY_KEY, TypeHookReactQuery } from '@/constants/reactQuery'
import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import ClientApi from '@/services/clientApi'

const getData = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: any
  pageParam: any
}): Promise<TypeHookReactQuery> => {
  const query = queryKey[2]
  const dateTime = queryKey[3]
  const { type = null } = query
  console.log({ type, dateTime })

  let queryUrl = `${queryKey[1]}?page=${pageParam}&limit=${PAGE_SIZE_LIMIT}`
  if (type) {
    queryUrl += `&status=${type[0]}`
  }
  if (dateTime) {
    queryUrl += `&date=${dateTime}`
  }
  const dataServer = await ClientApi.getBills(queryUrl)

  return {
    data: dataServer?.data || [],
    page: pageParam,
  }
}

const useBill = (query: any = [], dateTime = '') => {
  const { userData } = useUserData()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.MyBillUser, userData?._id, query, dateTime],
    queryFn: getData,
    enabled: !!userData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }
      return null
    },
  })

  const dataFinal = useMemo(() => {
    if (!data) {
      return []
    }
    const dataFormat = data?.pages.flatMap((e: any) => e.data)
    return dataFormat
  }, [data])

  return {
    data: dataFinal,
    isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

export default useBill
