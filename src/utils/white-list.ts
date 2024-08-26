import { type RouteLocationNormalized } from 'vue-router'

// 免登白名单
const whiteListByPath: string[] = ['/login']

// 匹配名称
const whiteListByName: string[] = ['Login']

const isWhiteList = (route: RouteLocationNormalized): boolean => {
  const { name, path } = route
  return whiteListByPath.includes(path) || whiteListByName.includes(name as string)
}

export default isWhiteList
