import http from '@/utils/request';

export const getUsers = (params?: object) => {
  return http.get('/users', params);
};
