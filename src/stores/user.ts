import { loginApi, getUserInfo } from '@/apis/login';
import type { LoginParams } from '@/apis/types/params';

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: ''
  }),
  actions: {
    // 登录
    async login({ username, password }: LoginParams) {
      const { data, code } = await loginApi({ username, password });
      if (code === 200) {
        this.token = data.token;
      }
    },
    // 获取用户详情
    async getInfo() {
      const { data } = await getUserInfo();
      this.username = data.username;
    },
    // 登出
    logout() {
      this.token = '';
    },
    // 重置
    reset() {
      this.token = '';
    }
  },
  // 开始数据持久化
  persist: true
});
