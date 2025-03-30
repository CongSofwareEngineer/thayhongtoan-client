import useUserData from '../useUserData'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/reactQuery'
import ClientApi from '@/services/clientApi'
import { useEffect } from 'react'
import { expiredTimeToNumber } from '@/utils/momentFunc'

const getData = async ({ queryKey }: { queryKey: any }): Promise<any[]> => {
  const data = await ClientApi.getVouchersByIdUser(queryKey[1])
  return data?.data || []
}

const useVoucherUser = () => {
  const { userData, isLogin } = useUserData()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.VoucherByIdUser, userData?._id],
    queryFn: getData,
    enabled: isLogin,
    initialData: [],
  })

  useEffect(() => {
    if (data.length > 0) {
      const arrValid = data.filter((e) => {
        const isValidDate = expiredTimeToNumber(e.expired)
        return isValidDate >= 0
      })
      console.log({ arrValid })
    }
  }, [data, userData])

  return {
    isLoading,
    data,
    refetch,
  }
}

export default useVoucherUser
