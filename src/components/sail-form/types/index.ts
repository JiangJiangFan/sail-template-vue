export type OptionalPrams<T, K extends keyof T = keyof T> = {
  [P in K]?: T[P];
};
export interface FormConfigType {
  label: string;
  prop: string;
  // 表单类型
  type: number;
  // 校验规则
  rules?: any;
  slots?: any;
  // 是否必填
  required?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否隐藏
  hidden?: boolean;
  // 是否添加删除
  clearable?: boolean;
  // 值
  value?: string | number;
  num?: NumType;
  sel?: SelType;
  date?: DateType;
  rad?: RadType;
}
export type ResultType = string | number | boolean | undefined;

// number 组件相关类型
type NumType = {
  // 数字输入精确度
  precision?: number;
  min?: number;
  max?: number;
  // 自定义符号
  dataUnit?: string;
  // 是否显示单位
  controls?: boolean;
};
// 下拉组件相关
type SelType = {
  options: Array<Record<string, string | number>>;
  // 自定义options变量
  field?: Options;
};
type RadType = {
  options: any;
};
type Options = {
  label: string;
  value: string;
};
// 日期组件相关
type DateType = {
  // 日期类型
  dateType?: any;
  // 日期显示格式
  format?: string;
  // 返回日期格式
  valueFormat?: string;
};
