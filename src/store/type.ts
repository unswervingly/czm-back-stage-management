import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/type'

// 根 store 的类型定义
export interface IRootState {
  name: string
  age: number
  // 所有部门数据
  entireDepartment: any[]
  // 所有角色数据
  entireRole: any[]
  // 完整菜单数据
  entireMenu: any[]
}

// 封装useStore
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
