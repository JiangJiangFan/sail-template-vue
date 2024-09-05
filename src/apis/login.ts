import { post, get } from '@/utils/http';
import { LoginParams } from './types/params';
import { RLogin, RInfo } from './types/response';

export function loginApi(data: LoginParams) {
  return post<RLogin>('/login', data);
}

export function getUserInfo() {
  return get<RInfo>('/info');
}

export function logoutApi() {
  return post('/logout');
}
