import { contentTableConfig } from '@/views/main/product/goods/config/content.config'
import czmRequest from '../../index'

import { IDataType } from '../../types'

// 1.main中user的网络请求，得到用户的列表数据
export function getPageListData(url: string, queryInfo: any) {
  return czmRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 2.在page-content中请求vuex 在vuex中请求网络接口，删除用户列表中选择的数据
// url: /users/:id
export function deletePageData(url: string) {
  return czmRequest.delete<IDataType>({
    url: url
  })
}
