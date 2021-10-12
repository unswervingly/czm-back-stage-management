import { useStore } from '../store/index'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  // 获取store的login中 permissions的值
  const permissions = store.state.login.permissions
  // 判断我传进来pageName，handleName 拼接之后要和permissions一样，说明你有这个权限
  const verifyPermission = `system:${pageName}:${handleName}`

  // !! 的使用
  // name = "czm"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission)
}
