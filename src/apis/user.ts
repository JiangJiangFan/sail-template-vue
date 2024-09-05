import { get } from '@/utils/http';

export const getUsers = (params?: object) => {
  return get('/users', params);
};
