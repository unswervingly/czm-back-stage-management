import { Module } from 'vuex'

import { IRootState } from '../../type'
import { ISystemState } from './type'

// 导入网络请求
import { getPageListData } from '../../../service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,

      roleList: [],
      roleCount: 0,

      menuList: [],
      menuCount: 0,

      goodsList: [],
      goodsCount: 0
    }
  },
  getters: {
    // 动态 响应式 通过getters返回是函数可以传参数pageName来判断 得到state是哪个数据
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },

    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    // user 把请求的数据添加到state中
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },

    // role 把请求的数据添加到state中
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },

    // menu 把请求的数据添加到state中
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },

    // goods 把请求的数据添加到state中
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    // 根据pageName 获取到需要的页面数据
    async getPageListAction({ commit }, payload: any) {
      // 1.根据传过来的pageName 获取pageUrl
      const pageName = payload.pageUrl
      const pageUrl = `/${pageName}/list`

      // 2.对页面发送网络请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult)

      // 3.将数据存储到store中
      const { list, totalCount } = pageResult.data
      // 首字母大写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}

export default systemModule
