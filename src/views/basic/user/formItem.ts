import { FormConfigType } from '@/components/sail-form/types';

export const formItem: FormConfigType[] = [
  {
    label: '用户名',
    prop: 'username',
    type: 3
  },
  {
    label: '密码',
    prop: 'password',
    type: 3
  },
  {
    label: '确认密码',
    prop: 'newPass',
    type: 3
  },
  {
    label: '昵称',
    prop: 'nickname',
    type: 3
  },
  {
    label: '头像',
    prop: 'avator',
    type: 3
  },
  {
    label: '角色类型',
    prop: 'role_id',
    type: 6,
    rad: {
      options: [
        { label: '管理员', value: 1 },
        { label: '普通用户', value: 2 }
      ]
    }
  }
];

export const editItem: FormConfigType[] = [
  {
    label: '用户名',
    prop: 'username',
    type: 3
  },
  {
    label: '昵称',
    prop: 'nickname',
    type: 3
  },
  {
    label: '头像',
    prop: 'avator',
    type: 3
  },
  {
    label: '角色类型',
    prop: 'role_id',
    type: 6,
    rad: {
      options: [
        { label: '管理员', value: 1 },
        { label: '普通用户', value: 2 }
      ]
    }
  }
];
