import http from '@/utils/request';

export type LoginRequestData = {
  username: string;
  password: string; // 密码
};

export function loginApi(data: any) {
  return http.post('/login', data);
}

export function getUserInfo(token: string) {
  return http.get('/info', { params: token });
}

export function logoutApi() {
  return http.post('/logout');
}
