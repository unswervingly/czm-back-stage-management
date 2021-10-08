import { Module } from 'vuex'

import LocalCache from '../../utils/cache'
import { mapMenuToRoutes } from '../../utils/map-menus'
import router from '../../router/index'

// 登录数据请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '../../service/login/login'
// 登录逻辑传入参数payload的类型
import { IAccount } from '../../service/login/type'

// 根的 store 的类型定义
import { IRootState } from '../type'
// login的 store 的类型定义
import { ILoginState } from './type'
/* export interface ILoginState {
  token: string
  age: number
} */

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 1.把userMenus 映射到 routes
      const routes = mapMenuToRoutes(userMenus)
      console.log(routes)

      // 2.将 routes 添加到 router.main.children 里面
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })
    }
  },
  actions: {
    // 账户
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const requestUserMenusResult = await requestUserMenusByRoleId(
        userInfo.role.id
      )
      const userMenus = requestUserMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.路由跳转到首页
      router.push('/main')
    },

    // 刷新页面，vuex数据重新加载的方法
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },

    // 手机验证
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行accountLoginAction', payload)
    }
  },
  modules: {}
}

export default loginModule
