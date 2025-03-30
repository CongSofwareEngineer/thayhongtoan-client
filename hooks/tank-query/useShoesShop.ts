import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import ClientApi from '@/services/ClientApi/index'
import { IProduct } from '@/services/ClientApi/type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const getAllProduct = async ({
  queryKey,
  pageParam,
}: {
  queryKey: any
  pageParam: number
}): Promise<{
  data: IProduct[]
  page: number
}> => {
  const query = queryKey[2]

  let queryUrl = `/shoes?page=${pageParam}&limit=${queryKey[1]}`
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      queryUrl += `&${key}=${value?.toString()}`
    })
  }

  const dataServer = await ClientApi.getListProducts(queryUrl)

  return {
    data: dataServer,
    page: pageParam,
  }
}

const useShoesShop = (query: any, pageSize = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.GetShoesShop, pageSize, query],
    initialPageParam: 1,
    queryFn: getAllProduct,
    getNextPageParam: (lastPage: { data: any; page: number }) => {
      if (lastPage.data.length == pageSize) {
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
    isLoading: isLoading,
    isFetchingNextPage,
    loadMore: fetchNextPage,
    hasNextPage,
  }
}

export default useShoesShop
