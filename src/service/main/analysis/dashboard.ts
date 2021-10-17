import czmRequest from '../../index'

enum DashboardAPI {
  // 每个分类商品的个数接口
  categoryGoodsCount = '/goods/category/count',
  // 每个分类商品的销量接口
  categoryGoodsSale = '/goods/category/sale',
  // 每个分类商品的收藏接口
  categoryGoodsFavor = '/goods/category/favor',
  // 不同城市的销量接口
  addressGoodsSale = '/goods/address/sale'
}

// 每个分类商品的个数的网络请求
export function getCategoryGoodsCount() {
  return czmRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

// 每个分类商品的销量的网络请求
export function getCategoryGoodsSale() {
  return czmRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

// 每个分类商品的收藏的网络请求
export function getCategoryGoodsFavor() {
  return czmRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

// 不同城市的销量的网络请求
export function getAddressGoodsSale() {
  return czmRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
