import { createApp } from 'vue'

// element-plus 全局引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// element-plus 局部引入
import { globalRegister } from './global'

// axios 基本语法
// import './service/axios_demo'
// axios 封装使用
import czmRequest from './service/index'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

// element-plus 局部引入
// globalRegister(app)
app.use(globalRegister)

app.use(store)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')

// 方式三 区分环境变量
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

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

czmRequest.request({
  url: '/home/multidata',
  method: 'GET'
  // 是否显示Loading,默认是有Loading
  // showLoading: false
})
