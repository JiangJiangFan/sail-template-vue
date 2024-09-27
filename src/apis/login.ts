import { post, get } from '@/utils/http';
import { LoginParams } from './types/params';
import { RInfo } from './types/response';

export function loginApi(data: LoginParams) {
  return post<string>('/login', data);
}

export function getUserInfo() {
  return get<RInfo>('/info');
}

export function logoutApi() {
  return post('/logout');
}
