import { useQuery } from '@tanstack/react-query'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { DEMO_CLASSES, DemoClass, DEMO_CLASS_IMAGES } from '@/constants/demoData'
import { QUERY_KEY } from '@/constants/reactQuery'
import ClassAPI from '@/services/API/Class'
import { IClassFilter } from '@/services/API/Class/type'

// Give every class a cover image even when the backend stores none
const withPresentation = (item: any, index: number): DemoClass => ({
  ...item,
  _id: item?._id || `class-${index}`,
  image: item?.image || DEMO_CLASS_IMAGES[index % DEMO_CLASS_IMAGES.length],
  schedule: item?.schedule || item?.attributes?.time || '',
})

/**
 * Public class list used by the marketing pages. Falls back to seed classes when
 * the backend returns nothing so the site never shows an empty catalogue.
 */
const useGetClassPublic = (query: IClassFilter = {}, { useFallback = true }: { useFallback?: boolean } = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.Class, 'public', query],
    queryFn: async () => {
      const res = await ClassAPI.get('get-all', { ...query, page: 1, limit: query?.limit || PAGE_SIZE_LIMIT })

      return (res?.data || []) as any[]
    },
  })

  const raw = data && data.length > 0 ? data : useFallback ? DEMO_CLASSES : []
  const list = raw.map(withPresentation)

  return { data: list, isLoading, isError, refetch }
}

export default useGetClassPublic
