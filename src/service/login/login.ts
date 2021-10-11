import czmRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/:id
  UserMenus = '/role/' // 用法: /role/:id/menu
}

// 1.实现登录逻辑
export function accountLoginRequest(account: IAccount) {
  return czmRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 2.请求用户信息
export function requestUserInfoById(id: number) {
  return czmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 3.请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return czmRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
