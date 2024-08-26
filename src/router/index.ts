import { useUserStore } from '@/stores/user'
import isWhiteList from '@/utils/white-list'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layouts = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      isHide: true
    },
    children: [{ path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index.vue') }]
  },
  {
    path: '/',
    component: Layouts,
    name: '主页',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isHide: true
    }
  },
  {
    path: '/setting',
    component: Layouts,
    redirect: '/setting/title',
    name: '基础数据',
    meta: { title: '基础数据', icon: 'menu' },
    children: [
      {
        path: 'title',
        name: '标题',
        component: () => import('@/views/setting/title/index.vue')
      },
      {
        path: 'tracking',
        name: '单号',
        component: () => import('@/views/setting/tracking/index.vue')
      }
    ]
  },
  {
    path: '/error-page',
    component: Layouts,
    redirect: '/error-page/404',
    meta: {
      isHide: true
    },
    children: [
      // {
      //   path: '403',
      //   name: '403',
      //   component: () => import('@/views/error-page/403.vue')
      // },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        alias: '/:pathMatch(.*)*'
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Layouts,
    redirect: '/error-page/404',
    children: [],
    meta: { isHide: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const token = userStore.token

  if ((token ?? '') === '') {
    // 白名单
    if (isWhiteList(to)) {
      next()
    } else {
      // 否则进入登陆
      next({ path: '/login' })
    }
    return
  } else {
    // 是否获取用户信息
    userStore.getInfo()
    next()
    return
  }
})

export default router
