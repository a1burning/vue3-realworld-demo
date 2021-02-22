import axios from 'axios'
import { store } from '@/store'

export const request = axios.create({
  // VUE_APP 开头才能在应用中读取到 vue的webpack只会把这种开头的进行读取
  baseURL: process.env.VUE_APP_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(config => {
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Token ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
