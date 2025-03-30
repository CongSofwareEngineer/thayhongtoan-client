import { COOKIE_KEY, PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY, TypeHookReactQuery } from '@/constants/reactQuery'
import useUserData from '../useUserData'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import ClientApi from '@/services/clientApi'
import { getCookie } from '@/services/cookiesService'

const getData = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: any
  pageParam: any
}): Promise<TypeHookReactQuery> => {
  const isLogin = queryKey[3]
  if (isLogin) {
    const queryUrl = `${queryKey[1]}?page=${pageParam}&limit=${queryKey[2]}`
    const dataServer = await ClientApi.getMyCart(queryUrl)

    return {
      data: dataServer?.data || [],
      page: pageParam,
    }
  } else {
    const data = await getCookie(COOKIE_KEY.MyCart)

    if (Array.isArray(data)) {
      return {
        data,
        page: pageParam,
      }
    }
  }

  return {
    data: [],
    page: pageParam,
  }
}

const useMyCart = (pageSize = PAGE_SIZE_LIMIT) => {
  const { userData, isLogin } = useUserData()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.MyCartUser, userData?._id, pageSize, isLogin],
    queryFn: getData,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage?.data?.length == pageSize) {
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
    isLoading: isFetchingNextPage || isLoading,
    loadMore: fetchNextPage,
    hasNextPage,
  }
}

export default useMyCart
