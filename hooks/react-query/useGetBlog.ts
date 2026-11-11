import { useQuery } from '@tanstack/react-query'

import { DEMO_BLOGS } from '@/constants/demoData'
import { QUERY_KEY } from '@/constants/reactQuery'
import BlogAPI from '@/services/API/Blog'
import { IBlog, IBlogFilter } from '@/services/API/Blog/type'

// Blog list with seed fallback so /blog always has something to read
const useGetBlog = (query: IBlogFilter = {}, { useFallback = true }: { useFallback?: boolean } = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.Blog, query],
    queryFn: async () => {
      const res = await BlogAPI.getAll(query)

      return (res?.data || []) as IBlog[]
    },
  })

  const list = data && data.length > 0 ? data : useFallback ? DEMO_BLOGS : []

  return { data: list, isLoading, isError, refetch }
}

export default useGetBlog
