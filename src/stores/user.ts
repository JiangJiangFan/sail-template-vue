import { loginApi, getUserInfo } from '@/apis/login';
import type { LoginParams } from '@/apis/types/params';
import { defineStore } from 'pinia';
import router from '../router';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: ''
  }),
  actions: {
    setUser(val: string) {
      this.username = val;
    },
    setToken(val: string) {
      this.token = val;
    },
    // 登录
    async login({ username, password }: LoginParams) {
      const { data } = await loginApi({ username, password });
      if (data !== null || data !== '') {
        this.setToken(data);
        this.setUser(username);
        router.push('home');
      }
    },
    // 获取用户详情
    async getInfo() {
      const { data } = await getUserInfo();
      this.setUser(data.username);
    },
    // 登出
    logout() {
      this.setToken('');
      router.push('login');
    },
    // 重置
    reset() {
      this.setToken('');
    }
  },
  // 开始数据持久化
  persist: true
});
