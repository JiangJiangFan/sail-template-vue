import { useUserStore } from '@/stores/user';
import isWhiteList from '@/utils/white-list';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Layouts = () => import('@/layout/index.vue');

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      isHide: true
    },
    children: [
      { path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index.vue') }
    ]
  },
  {
    path: '/',
    component: Layouts,
    name: '主页',
    redirect: 'home',
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
    path: '/basic',
    component: Layouts,
    redirect: 'basic/user',
    name: '基础数据',
    meta: { title: '基础数据', icon: 'menu' },
    children: [
      {
        path: 'user',
        name: '用户',
        component: () => import('@/views/basic/user/index.vue')
      }
      // {
      //   path: 'tracking',
      //   name: '单号',
      //   component: () => import('@/views/setting/tracking/index.vue')
      // }
    ]
  },
  {
    path: '/setting',
    component: Layouts,
    redirect: '/setting/title',
    name: '系统设置',
    meta: { title: '系统设置', icon: 'setting' },
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
    path: '/editor',
    component: Layouts,
    redirect: '/editor/title',
    name: '编辑器',
    meta: { title: '编辑器', icon: 'doc' },
    children: [
      {
        path: 'word',
        name: '富文本编辑器',
        component: () => import('@/views/editor/index.vue')
      }
      // {
      //   path: 'tracking',
      //   name: 'MD 编辑器',
      //   component: () => import('@/views/setting/tracking/index.vue')
      // }
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
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;
  // token 不存在
  if ((token ?? '') === '') {
    // 白名单
    if (isWhiteList(to)) {
      next();
    } else {
      // 否则进入登陆
      userStore.token = '';
      next({ path: '/login' });
    }
    return;
  } else {
    next();
  }
});

export default router;
