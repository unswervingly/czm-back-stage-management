import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CZMRequestInterceptors, CZMRequestConfig } from './type'

class CZMRequest {
  instance: AxiosInstance
  interceptors?: CZMRequestInterceptors

  constructor(config: CZMRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有的实例都有的拦截器: 响应成功拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 响应失败拦截')
        return err
      }
    )
  }

  request(config: CZMRequestConfig): void {
    // 1.单个请求对请求config的处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      // 1.单个请求对res数据的处理
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default CZMRequest
