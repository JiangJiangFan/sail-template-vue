import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import { Meta } from '@/apis/types/meta';

/**
 * 退出登陆并强制刷新页面
 */
function logout() {
  useUserStore().logout();
  location.reload();
}

/**
 * 所有api接口的响应数据格式
 */
export interface ApiResponseData<T> {
  code: number;
  data: T;
  message: string;
  meta: Meta;
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API as string,
  // baseURL: 'apis',
  timeout: 5000
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 拦截请求配置加 token
    const userState = localStorage.getItem('user');
    const user = userState !== null ? JSON.parse(userState ?? '') : '';
    if (user.token) {
      config.headers!.Authorization = user.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    const apiData = res.data;
    const resType = res.request?.resonseType;
    if (resType === 'blob' || resType === 'arraybuffer') return apiData;
    const code = apiData.code;
    if (code === undefined) {
      return Promise.reject(new Error('非正常业务接口'));
    }
    switch (code) {
      case 200:
        return apiData;
      case 10004:
        return logout();
      default:
        ElMessage.error({ message: apiData.msg || 'Error' });
        return Promise.reject(apiData.msg);
    }
  },
  (err) => {
    console.log(JSON.stringify(err));

    // 这里用来处理http常见错误，进行全局提示
    const { status } = err.response;
    console.log(status);
    switch (status) {
      case 400:
        err.message = '请求错误(400)';
        break;
      case 401:
        err.message = '未授权，请重新登录(401)';
        // 这里可以做清空storage并跳转到登录页的操作
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '请求超时(408)';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '服务不可用(503)';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = 'HTTP版本不受支持(505)';
        break;
      default:
        break;
    }
    // 这里错误消息可以使用全局弹框展示出来
    ElMessage.error(err.message);
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    return Promise.reject(err.response);
  }
);

export default instance;
