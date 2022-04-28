import axios from 'axios'
// import Pagination from '../@types/Pagination'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://furia-api.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})


const getStreamers = async () => {
  const { data } = await http.get(`/streamers`)
  return data
}

const getPoints = async (wallet: string) => {
  if(!wallet) return
  const { data } = await http.get(`/points/${wallet}`)
  return data
}

const apiService = {
  getStreamers,
  getPoints
}

export default apiService
