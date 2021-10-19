import { Module } from 'vuex'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '../../../service/main/analysis/dashboard'

import { IRootState } from '../../type'
import { IDashboardState } from './type'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 每个分类商品的总数
      topPanelData: [],
      // 每个分类商品的个数
      categoryGoodsCount: [],
      // 每个分类商品的销量
      categoryGoodsSale: [],
      // 每个分类商品的收藏
      categoryGoodsFavor: [],
      // 不同城市的销量
      addressGoodsSale: []
    }
  },
  mutations: {
    changeTopPanelData(state, list) {
      state.topPanelData = list
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    // 实现数据可视化的模块Action
    async getDashBoardDataAction({ commit }) {
      // 每个分类商品的总数 网络请求下来的数据
      const resultTopPanelData = await getAmountList()
      commit('changeTopPanelData', resultTopPanelData.data)
      // 每个分类商品的个数 网络请求下来的数据
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      // 每个分类商品的销量 网络请求下来的数据
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      // 每个分类商品的收藏 网络请求下来的数据
      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)
      // 不同城市的销量 网络请求下来的数据
      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule
