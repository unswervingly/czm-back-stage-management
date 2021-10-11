import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CZMRequestInterceptors, CZMRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

const DEFAULT_LOADING = true

class CZMRequest {
  instance: AxiosInstance
  interceptors?: CZMRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: CZMRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    // 外面使用interceptors 有拦截器的信息
    this.interceptors = config.interceptors
    // 外面使用showLoading 要有加载页面的信息
    // ??：前面没有就用后面的，即我没有设置时，默认为??后面哪一个
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

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
        // 请求时候有加载动画,并且外面要传入是开启了加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        console.log('所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 1s 将loading移除
        setTimeout(() => {
          this.loading?.close()
        }, 10)

        const data = res.data

        // 对响应的错误消息进行拦截处理
        // 方式一：请求成功后，会在响应res 判断returnCode的值是否是正确的
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }

        console.log('所有的实例都有的拦截器: 响应成功拦截')
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 方式二：请求错误后，会在响应err 判断不同的HttpErrorCode(err.response.status)显示不同的错误信息
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              console.log('请求失败')
              break
            case 401:
              console.log('未授权访问')
              break
            default:
              console.log('其他错误信息')
              break
          }
        }

        console.log('所有的实例都有的拦截器: 响应失败拦截')
        return err
      }
    )
  }

  request<T = any>(config: CZMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对res数据的处理
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 错误也要将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: CZMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: CZMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: CZMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: CZMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default CZMRequest
