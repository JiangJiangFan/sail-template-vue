// 登陆返回参数
// export type RLogin = { token: string };

export type RInfo = { username: string };

export type RUser = {
  id: number;
  created_at: string;
  updated_at: string;
  username: string;
  nickname: string;
  avator: string;
  role_id: string;
  role_name?: string;
};
