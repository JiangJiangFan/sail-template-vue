import { loginApi, getUserInfo, type LoginRequestData } from '@/apis/login';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: ''
  }),
  actions: {
    // 登录
    async login({ username, password }: LoginRequestData) {
      const { data, code } = await loginApi({ username, password });
      if (code === 200) {
        this.token = data;
      }
    },
    // 获取用户详情
    async getInfo() {
      const { data } = await getUserInfo(this.token);
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
