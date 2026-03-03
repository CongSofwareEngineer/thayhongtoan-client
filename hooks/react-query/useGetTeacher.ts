import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import TeacherAPI from '@/services/API/Teacher'
import { ITeacher, ITeacherFilter } from '@/services/API/Teacher/type'

const useGetTeacher = (query: ITeacherFilter = {}) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Teacher, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await TeacherAPI.get('', { ...query, page: pageParam, limit: query?.limit || PAGE_SIZE_LIMIT })

      return {
        data: response?.data || [],
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: ITeacher[]; page: number }) => {
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

export default useGetTeacher
