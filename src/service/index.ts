// service统一出口
import CZMRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config(不同环境下的环境变量)'

import LocalCache from '../utils/cache'

const czmRequest = new CZMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default czmRequest
