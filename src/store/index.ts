import { createStore, Store, useStore as useVuexStore } from 'vuex'

// 导入login的 模块
import loginModule from './login/login'
// 导入main中system的 模块
import systemModule from './main/system/system'
// 导入main中analysis的 模块
import dashboardModule from './main/analysis/dashboard'

// 根 store 的类型定义
import { IRootState, IStoreType } from './type'
/* interface IRootState {
  name: string
  age: number
} */

import { getPageListData } from '../service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'czm',
      age: 18,
      // 所有部门数据
      entireDepartment: [],
      // 所有角色数据
      entireRole: [],
      // 完整菜单数据
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList: any) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList: any) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList: any) {
      state.entireMenu = menuList
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data

      // 请求完整菜单数据
      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 100
      })
      const { list: menuList } = menuResult.data

      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login: loginModule,
    system: systemModule,
    dashboard: dashboardModule
  }
})

export function setupStore() {
  // 防止页面刷新，store直接清除了
  store.dispatch('login/loadLocalLogin')

  // 请求部门和角色数据,但是当外面退出登录时没有token，就会产生bug
  // store.dispatch('getInitialDataAction')
}

// 封装让vuex支持ts
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
