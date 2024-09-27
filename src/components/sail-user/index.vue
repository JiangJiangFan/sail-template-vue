<script setup lang="ts">
import { ref, watch } from 'vue';
import SailUserDialog from './others/SailUserDialog.vue';
import { ChooseType, ResultType, ApisType } from './types/index';

type DeptAndUser = {
  id: string;
  ids: string[];
  len: number;
};

const props = defineProps({
  // 返回结果
  resultData: {
    type: Array as () => string[],
    default: () => [],
    require: true
  },
  // 初始选中数据
  initData: {
    type: Array as () => ResultType[],
    default: () => [],
    require: true
  },
  title: {
    type: String,
    default: '选择成员'
  },
  apis: {
    type: Object as () => ApisType,
    require: true
  },
  // 当前选中用户，实时更新
  currentData: {
    type: Array as () => string[],
    default: () => [],
    require: true
  }
});

const emits = defineEmits(['update:resultData', 'user', 'dept']);

const org = { id: '0', name: '组织' };
const levelList = ref<ResultType[]>([]); // 面包屑
const deptNode = ref<ResultType[]>([]);
const userNode = ref<ResultType[]>([]);
const searchNode = ref<ResultType[]>([]);
const deptToUser = ref<DeptAndUser[]>([]);
const current = ref<ChooseType>({
  user: [],
  dept: [],
  search: []
});
const visible = ref(false);
const initValue = ref(props.initData);

const handleSearch = (val: string) => {
  console.log('搜索', val);
  let userList: ResultType[] = [];
  const str = `<span style="color:#2DEB79">${val}</span>`;
  const user = current.value.user;
  // 回调，获取父组件方法返回值
  emits('user', val, (result: ResultType[]) => {
    userList = result;
  });
  searchNode.value = userList.map((item) => {
    return {
      id: item.id,
      name: item.name.split(val).join(str),
      dept: item.dept
    };
  });
  let list: string[] = [];
  // 取当前选中值
  const ids = user.map((m) => {
    return JSON.parse(m).id;
  });
  // 在搜索节点列表获取被选中值
  searchNode.value.filter((item) => {
    if (ids.includes(item.id)) {
      list.push(item.id);
    }
  });
  // 赋值
  current.value.search = list;
};
// 点击部门进入下级部门
const handleClick = (val: ResultType) => {
  console.log('点击');
  let temp = [];
  for (const value of levelList.value) {
    if (value.id === val.id) {
      break;
    }
    temp.push(value);
    if (value.parentId === val.id) {
      break;
    }
  }
  levelList.value = [...temp];
  emits('dept', val.id);
  if (val.id !== org.id) {
    levelList.value.push({ id: val.id, name: val.name });
  } else {
    levelList.value = [];
  }
};
const handleChange = (val: ResultType, type: string) => {
  console.log('选择');
  switch (type) {
    case 'dept':
      // 根据部门编号查询用户
      emits('user', val);
      handleDeptCheck(val, 'select');
      break;
    case 'search':
      handleSearchCheck('select');
      break;
    default:
      break;
  }
};
const handleUnChange = (val: ResultType, type: string) => {
  switch (type) {
    case 'dept':
      // 根据部门编号查询用户
      props.apis?.user(val);
      handleDeptCheck(val, 'cancel');
      break;
    case 'search':
      handleSearchCheck('cancel');
      break;
    default:
      break;
  }
};

// 选中部门
const handleDeptCheck = (value: ResultType, type: string) => {
  // 记录当前部门内成员
  let ids: string[] = [];
  let list = props.currentData;
  if (type === 'select') {
    const temp = {
      id: value.id,
      ids: ids,
      len: ids.length
    };
    list = [...new Set([...current.value.user, ...list])];
    current.value.user = [...list];
    deptToUser.value.push(temp);
  } else {
    const filtered = current.value.user.filter((item) => !list.includes(item));
    current.value.user = filtered;
    deptToUser.value.filter((item) => item.id !== value.id);
  }
  // 部门节点
  deptNode.value = deptNode.value.map((m) => {
    if (m.id === value.id) {
      return { ...m, isChecked: false };
    }
    return m;
  });
};

// 选中搜索节点
const handleSearchCheck = (type: string) => {
  const search = current.value.search;
  const user = current.value.user;
  // 从用户节点获取当前用户名
  let list: string[] = [];
  userNode.value.filter((item) => {
    if (search.includes(item.id)) {
      list.push(JSON.stringify({ id: item.id, name: item.name }));
    }
  });
  // 处理用户节点
  if (type === 'select') {
    current.value.user = user.length > 0 ? Array.from(new Set([...user, ...list])) : list;
  } else {
    // 取消选中
    current.value.user = user.filter((item) => list.includes(item));
  }
};

// 设置用户选中状态
const handleUserCheck = (val: string[], type: string) => {
  if (val.length == 1) {
    const params = JSON.parse(val[0]);
    if (type === 'add') {
      let userInDept: string[] = [];
      emits('user', params.id, (result: string[]) => {
        userInDept = result;
      });
      let flag = false; // 是否添加当前用户
      deptToUser.value.forEach((item) => {
        // 如果当前部门已有成员被选择
        if (userInDept[0] === item.id) {
          // 为当前部门添加用户
          item.ids.push(params.id);
          flag = true;
        }
      });
      // 当前部门不存在时，添加当前部门
      if (!flag) {
        let userNum = 0;
        emits('user', userInDept[0], (result: number) => {
          userNum = result;
        });
        const query = {
          id: userInDept[0],
          ids: [params.id],
          len: userNum
        };
        deptToUser.value.push(query);
      }
    } else {
      for (let i = 0; deptToUser.value.length; i++) {
        deptToUser.value[i].ids = deptToUser.value[i].ids.filter((id) => id !== params.id);
      }
      udpateNode();
    }
  }
};
const udpateNode = () => {
  // 更新节点状态
  deptToUser.value.forEach((item) => {
    if (item.ids.length > 0 && item.ids.length < item.len) {
      updateNodeParams(item.id, true);
    } else {
      if (item.ids.length == 0) {
        const dept = current.value.dept.filter((i) => i !== item.id);
        current.value.dept = dept;
      }
      updateNodeParams(item.id, false);
    }
  });
};
const updateNodeParams = (val: string, bool: boolean) => {
  for (let i = 0; i < deptNode.value.length; i++) {
    if (deptNode.value[i].id === val) {
      deptNode.value[i].isChecked = bool;
    }
  }
};
// =========== 显示框事件 ============== //
// 显示弹窗
const handleUnfold = () => {
  if (visible.value === true) {
    visible.value = false;
  } else {
    visible.value = true;
    // this.getDept('0');
    props.apis?.dept('0');
    const temp = initValue.value.map((m) => JSON.stringify(m));
    current.value.user = temp;
  }
};
// 删除用户
const handleDelUser = (val: ResultType) => {
  initValue.value = initValue.value.filter((item) => val !== item);
};

watch(
  // 监听当前选中用户
  () => current.value.user,
  (val, old): void => {
    if (val.length > old.length) {
      const intersection = val.reduce((acc: string[], value) => {
        if (!old.includes(value)) {
          acc.push(value);
        }
        return acc;
      }, []);
      handleUserCheck(intersection, 'add');
    } else {
      const intersection = old.reduce((acc: string[], value) => {
        if (!val.includes(value)) {
          acc.push(value);
        }
        return acc;
      }, []);
      handleUserCheck(intersection, 'sub');
    }
  }
);
watch(initValue, (val): void => {
  let ids = val.map((m) => m.id);
  emits('update:resultData', ids);
});
watch(
  () => props.initData,
  (val): void => {
    initValue.value = val;
  }
);
</script>

<template>
  <div>
    <div class="content">
      <div class="popup" @click="handleUnfold">
        <div v-for="item in initValue" :key="item.id">
          <div>{{ item.name }}<i @click.stop="handleDelUser(item)" class="el-icon-close" /></div>
        </div>
      </div>
    </div>
    <sail-user-dialog
      :initValue.sync="initValue"
      :current.sync="current"
      :visible.sync="visible"
      :title="props.title"
      :org="org"
      :levelList="levelList"
      :deptNode="deptNode"
      :userNode.sync="userNode"
      :searchNode="searchNode"
      @click="handleClick"
      @search="handleSearch"
      @change="handleChange"
      @un-change="handleUnChange"
    >
    </sail-user-dialog>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  .popup {
    border-radius: 6px 6px 6px 6px;
    border: 1px solid #656565;
    min-height: 32px;
    max-height: 100px;
    overflow: auto;
    > div {
      float: left;
      background: #464646;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #727272;
      margin-right: 6px;
      margin-top: 3px;
      margin-bottom: 3px;
      padding-left: 6px;
      &:first-child {
        margin-left: 3px;
      }
      > div {
        height: 24px;
        line-height: 24px;
        i {
          margin-left: 15px;
          padding-right: 6px;
        }
      }
    }
  }
}
</style>
