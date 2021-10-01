import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CZMRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface CZMRequestConfig extends AxiosRequestConfig {
  interceptors?: CZMRequestInterceptors
  showLoading?: boolean
}
