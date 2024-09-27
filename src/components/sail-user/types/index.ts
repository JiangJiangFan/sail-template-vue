export type ResultType = {
  name: string;
  id: string;
  isChecked?: boolean;
  dept?: string;
  parentId?: string;
};

export type ChooseType = {
  user: string[];
  dept: string[];
  search: string[];
};

export type ApisType = {
  user: Function;
  dept: Function;
};
