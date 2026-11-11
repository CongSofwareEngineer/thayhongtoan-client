import { useQuery } from '@tanstack/react-query'

import { COMMENT_STATUS } from '@/constants/app'
import { DEMO_COMMENTS } from '@/constants/demoData'
import { QUERY_KEY } from '@/constants/reactQuery'
import CommentAPI from '@/services/API/Comment'
import { IComment, ICommentFilter } from '@/services/API/Comment/type'

/**
 * Public reviews. Falls back to seed content when the backend has none,
 * so the review section is never an empty block on a marketing page.
 */
const useGetComment = (query: ICommentFilter = {}, { useFallback = true }: { useFallback?: boolean } = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.Comment, query],
    queryFn: async () => {
      const res = await CommentAPI.getAll(query)

      return (res?.data || []) as IComment[]
    },
  })

  const fallback = query.idClass ? DEMO_COMMENTS.filter((_, index) => index % 2 === 0) : DEMO_COMMENTS
  const list = data && data.length > 0 ? data : useFallback ? fallback : []
  const approved = list.filter((item) => !item.status || item.status === COMMENT_STATUS.APPROVED)
  const ratingAvg = approved.length ? approved.reduce((sum, item) => sum + (item.rating || 0), 0) / approved.length : 0

  return {
    data: list,
    approved,
    ratingAvg: Math.round(ratingAvg * 10) / 10,
    ratingCount: approved.length,
    isLoading,
    isError,
    refetch,
  }
}

export default useGetComment
