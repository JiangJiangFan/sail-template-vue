import { get, put } from '@/utils/http';
import { RUser } from './types/response';

export const getUsers = (params?: object) => {
  return get<RUser[]>('/user/all', params);
};

export const delUser = (params: number) => {
  return get('/user/del', params);
};

export const editUser = (data?: object) => {
  return put('/user', data);
};
