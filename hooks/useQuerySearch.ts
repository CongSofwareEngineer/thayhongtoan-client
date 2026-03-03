import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'

import { cloneData } from '@/utils/functions'

const useQuerySearch = <T extends object>() => {
  const searchParam = useSearchParams()
  const pathPage = usePathname()
  const router = useRouter()

  const parseQuery = (): T => {
    const searchPare = queryString.parse(searchParam.toString(), { arrayFormat: 'comma' })

    return cloneData(searchPare) as T // Rely on default parsing without forced splitting
  }

  const { data: query } = useQuery<T>({
    queryKey: ['useQuerySearch', pathPage, searchParam.toString()],
    queryFn: parseQuery,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: parseQuery(),
  })

  // Helper to handle both string and array inputs for updating
  const updateQuery = (key: keyof T, value: string | string[] | number | number[], isReplace = true) => {
    let searchPareClone = cloneData(query) as Record<string, any>

    if (!searchPareClone) {
      searchPareClone = {}
    }

    const valueStr = value?.toString()

    if (searchPareClone[key as string]) {
      const currentVal = searchPareClone[key as string]

      if (Array.isArray(currentVal)) {
        // If current value is array
        if (!currentVal.includes(valueStr)) {
          if (isReplace) {
            searchPareClone[key as string] = valueStr
          } else {
            searchPareClone[key as string].push(valueStr)
          }
        } else {
          // Toggle off if exists (optional logic, but typically filter removes it)
          searchPareClone[key as string] = currentVal.filter((e: string) => e !== valueStr)
          // If empty array, might want to delete or leave empty
          if (searchPareClone[key as string].length === 0) delete searchPareClone[key as string]
        }
      } else {
        // If current value is string
        if (currentVal !== valueStr) {
          if (isReplace) {
            searchPareClone[key as string] = valueStr
          } else {
            // Convert to array and append
            searchPareClone[key as string] = [currentVal, valueStr]
          }
        } else {
          // Same value, do nothing if we are in replace mode
          // Only toggle (delete) if we are explicitly not replacing (which implies multi-select toggle logic, though usually handle by array branch)
          if (!isReplace) {
            // For single values, !isReplace typically implies converting to array or toggling.
            // If we really want toggle behavior, we'd delete. But for safe sync, we often just want to ensure it's set.
            // Given the bug, let's play safe: if it's there and same, do nothing.
          }
        }
      }
    } else {
      // New key
      searchPareClone[key as string] = valueStr
    }

    // Clean up empty keys
    Object.keys(searchPareClone).forEach((k) => {
      if (!searchPareClone[k]) delete searchPareClone[k]
    })

    const stringified = queryString.stringify(searchPareClone, { arrayFormat: 'comma' })

    router.push(`${pathPage}?${stringified}`)
  }

  const clearAll = () => {
    router.push(pathPage)
  }

  return {
    query,
    updateQuery,
    clearAll,
    currentQueries: searchParam.toString(),
  }
}

export default useQuerySearch
