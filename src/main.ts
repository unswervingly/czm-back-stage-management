import { createApp } from 'vue'

// 让不同的浏览器在渲染网页元素的时候形式更统一。
import 'normalize.css'
import './assets/css/index.less'
// 1.element-plus 全局引入
// import ElementPlus from 'element-plus'
// 引入全局element plus icon
// import { Edit } from '@element-plus/icons'
// 引入全局样式
import 'element-plus/dist/index.css'

// 2.element-plus 局部引入
import { globalRegister } from './global'

// axios 基本语法
// import './service/axios_demo'
// axios 封装使用
import czmRequest from './service/index'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// element-plus 局部引入
// globalRegister(app)
app.use(globalRegister)

app.use(store)
// setupStore() 要放到app.use(router)前面
setupStore()

app.use(router)
// app.use(ElementPlus)
// 引入全局element plus icon
// app.component('edit', Edit)
app.mount('#app')

// 方式三 区分环境变量
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// 封装axios
// czmRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// czmRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET'
//     // 是否显示Loading,默认是有Loading
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
