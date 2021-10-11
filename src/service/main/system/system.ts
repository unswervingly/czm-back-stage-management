import czmRequest from '../../index'

import { IDataType } from '../../types'

// 1.main中user的网络请求
export function getPageListData(url: string, queryInfo: any) {
  return czmRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
