import { requestParams, resultSuccess } from './_utils';
export default [
  {
    url: '/apis/users',
    method: 'get',
    response: (res: requestParams) => {
      return resultSuccess({ id: '1', username: 'sail' });
    }
  }
];
