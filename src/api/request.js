import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime, setTokenTime } from '@/utils/auth'
import store from '@/store'
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

server.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 过期了'))
      } else {
        setTokenTime()
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

server.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    error.message && ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  }
)

export default server
