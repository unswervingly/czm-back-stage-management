import { createApp } from 'vue'
import './service/axios_demo'

// element-plus 全局引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// element-plus 局部引入
import { globalRegister } from './global'

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

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
