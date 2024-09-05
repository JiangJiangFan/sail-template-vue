import { requestParams, resultError, resultSuccess } from './_utils';
export default [
  {
    url: '/apis/login',
    method: 'post',
    response: (res: requestParams) => {
      const { username, password } = res.body;
      if (username === 'Jiang' && password === '123456') {
        return resultSuccess({ token: 'jhgfaasdfgrqawgfvADbgzhbdfaf' });
      } else {
        return resultError('账户或密码错误');
      }
    }
  },
  {
    url: '/apis/info',
    method: 'get',
    response: (res: requestParams) => {
      const params = res.headers;

      if (params?.authorization !== '') {
        return resultSuccess({ username: 'Jiang' });
      } else {
        return resultError('token 已过期', { code: 10004 });
      }
    }
  }
];
