import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LocalCache from '../utils/cache'
import { firstMenu } from '../utils/map-menus'

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
    // children: [] -> 根据userMenu来决定的
  },
  {
    // 没有找到的页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "main" */ '../views/not-found/not-found.vue')
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

  // 对main进行重定向
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
