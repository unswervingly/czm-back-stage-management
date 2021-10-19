// main中system的所有组件 store 的module的state类型定义
export interface ISystemState {
  usersList: any[]
  usersCount: number

  roleList: any[]
  roleCount: number

  menuList: any[]
  menuCount: number

  departmentList: any[]
  departmentCount: number

  goodsList: any[]
  goodsCount: number

  categoryList: any[]
  categoryCount: number
}
