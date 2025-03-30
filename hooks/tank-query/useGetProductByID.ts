import { QUERY_KEY } from '@/constants/reactQuery'
import ClientApi from '@/services/ClientApi/index'
import { IClientApi } from '@/services/ClientApi/type'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any): Promise<IClientApi['product']> => {
  const data = await ClientApi.getProductById(queryKey[1])

  return data
}
const useGetProductByID = (id = '') => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GetProductByID, id],
    enabled: !!id,
    queryFn: getData,
  })
  return {
    data,
    isLoading,
  }
}

export default useGetProductByID
