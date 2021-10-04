import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LocalCache from '../utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    // 登录页面
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    // 首页页面
    path: '/main',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "main" */ '../views/main/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
