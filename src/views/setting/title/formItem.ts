import { FormConfigType } from '@/components/sail-form/types'

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
    label: '类型',
    prop: 'type',
    type: 1,
    sel: {
      options: [
        { label: '类型1', value: 1 },
        { label: '类型2', value: 2 }
      ]
    }
  },
  {
    label: '公司',
    prop: 'company',
    type: 3
  },
  {
    label: '产品',
    prop: 'product',
    type: 3
  }
]
