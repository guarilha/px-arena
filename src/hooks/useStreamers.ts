import { useQuery } from 'react-query'
import apiService from '../services/api'

const useStreamers = () => {
  return useQuery(['streamers'], () => apiService.getStreamers(),
  {
    // Refetch the data every second
    refetchInterval: 1000 * 60,
  })
}

export default useStreamers