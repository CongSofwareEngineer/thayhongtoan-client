import { QUERY_KEY } from '@/constants/reactQuery'
import { useQuery } from '@tanstack/react-query'
import useUserData from '../useUserData'
import { COOKIE_KEY } from '@/constants/app'
import { getCookie } from '@/services/cookiesService'
import { IClientApi } from '@/services/ClientApi/type'
import ClientApi from '@/services/ClientApi/index'
const getData = async ({ queryKey }: any) => {
  const isLogin = queryKey[2]
  if (isLogin) {
    const lengthCart = await ClientApi.getLengthCart(queryKey[1])

    return lengthCart
  } else {
    const data = await getCookie(COOKIE_KEY.MyCart)

    if (Array.isArray(data)) {
      return { lengthCart: data.length }
    }
  }
  return { lengthCart: 0 }
}
const useLengthCart = (id = '') => {
  const { isLogin } = useUserData()
  const { data, isLoading } = useQuery<IClientApi['lengthCart']>({
    queryKey: [QUERY_KEY.LengthCartUser, id, isLogin],
    queryFn: getData,
    initialData: { lengthCart: 0 },
  })

  return {
    data,
    isLoading,
  }
}

export default useLengthCart
