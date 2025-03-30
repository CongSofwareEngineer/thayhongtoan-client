import { QUERY_KEY } from '@/constants/reactQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getData = async ({ queryKey }: { queryKey: any }): Promise<any> => {
  const url = `https://esgoo.net/api-tinhthanh/${queryKey[1]}/${queryKey[2]}.htm`
  const data = await axios.get(url)
  return data?.data?.data || data?.data || []
}

const useAddressShip = (type: any, idItem: any) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: [QUERY_KEY.AllProvincesVn, type, idItem],
    queryFn: getData,
    enabled: !!type && !!idItem,
  })

  return {
    loading: isFetching || isLoading,
    data,
  }
}

export default useAddressShip
