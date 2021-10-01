import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CZMRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CZMRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: CZMRequestInterceptors<T>
  showLoading?: boolean
}
