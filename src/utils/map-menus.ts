import { RouteRecordRaw } from 'vue-router'

import { IBreadcrumb } from '@/base-ui/breadcrumb/index'

// 保留获取到的第一个菜单
export let firstMenu: any = null

// 把登录的用户的权限的菜单路由映射到routes
export function mapMenuToRoutes(useMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // '../router/main' + key -> ../router/main./analysis/dashboard/dashboard.ts 所以要转换
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  // useMenus:
  // type === 1 -> children -> type === 2 -> url -> route
  // type === 2 -> url -> route

  // 递归 获取需要的route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 保留第一个菜单
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(useMenus)
  return routes
}

// 笨办法
// // 根据路径和menu.type === 2/1 获取到Menu，放到面包屑上
/* export function pathMapBreadcrumbs(useMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []

  for (const menu of useMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs.push({ name: menu.name })
        breadcrumbs.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }

  return breadcrumbs
} */

// // 根据路径和menu.type === 2获取到Menu
/* export function pathMapToMenu(useMenus: any[], currentPath: string): any {
  for (const menu of useMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) return findMenu
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
} */

// 妙办法
// 根据路径和menu.type === 2/1 获取到Menu，放到面包屑上
export function pathMapBreadcrumbs(useMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []

  pathMapToMenu(useMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

// 根据路径和menu.type === 2获取到Menu
export function pathMapToMenu(
  useMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of useMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取Menus 中的按钮权限
export function mapMenusToPermissions(useMenus: any[]) {
  const permissions: string[] = []

  // 递归
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(useMenus)

  return permissions
}

// 获取菜单的叶子节点
export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leafKeys
}
