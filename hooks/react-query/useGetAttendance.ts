import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import AttendanceAPI from '@/services/API/Attendance'
import { IAttendance, IAttendanceFilter } from '@/services/API/Attendance/type'

const useGetAttendance = (query: IAttendanceFilter = {}) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Attendance, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await AttendanceAPI.get('', { ...query, page: pageParam, limit: query?.limit || PAGE_SIZE_LIMIT })

      return {
        data: response?.data || [],
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: IAttendance[]; page: number }) => {
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

export default useGetAttendance
