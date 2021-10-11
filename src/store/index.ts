import { createStore, Store, useStore as useVuexStore } from 'vuex'

// 导入login的 模块
import loginModule from './login/login'
// 导入main中system的 模块
import systemModule from './main/system/system'

// 根 store 的类型定义
import { IRootState, IStoreType } from './type'
/* interface IRootState {
  name: string
  age: number
} */

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'czm',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
    system: systemModule
  }
})

// 防止页面刷新，store直接清除了
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 封装让vuex支持ts
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
