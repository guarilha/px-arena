import { useQuery } from 'react-query'
import apiService from '../services/api'

const usePoints = (wallet: string) => {
  return useQuery(['points', wallet], () => apiService.getPoints(wallet), {
    refetchInterval: 30000
  })
}

export default usePoints