import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import StudentAPI from '@/services/API/Student'
import { IStudent, IStudentFilter } from '@/services/API/Student/type'

const useGetStudent = (query: IStudentFilter = {}) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Student, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await StudentAPI.get('all', { ...query, page: pageParam, limit: query?.limit || PAGE_SIZE_LIMIT })

      return {
        data: response?.data || [],
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: IStudent[]; page: number }) => {
      if (lastPage?.data?.length === query?.limit || PAGE_SIZE_LIMIT) {
        return lastPage.page + 1
      }

      return null
    },
  })

  const dataFinal = useMemo(() => {
    return data?.pages?.flatMap((item) => item.data) || []
  }, [data])

  return {
    data: dataFinal,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  }
}

export default useGetStudent
