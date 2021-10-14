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

// 3.新建用户的网络请求
export function createPageData(url: string, newData: any) {
  return czmRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 4.编辑用户的网络请求
export function editPageData(url: string, editData: any) {
  return czmRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
