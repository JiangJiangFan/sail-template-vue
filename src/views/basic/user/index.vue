<script setup lang="ts">
import type { RUser } from '@/apis/types/response';
import SailDrawer from '@/components/sail-drawer/index.vue';

import { getUsers, editUser } from '@/apis/user.ts';
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { formItem, editItem } from './formItem';
import { FormRules } from 'element-plus';
import { Meta } from '@/apis/types/meta';

type ColunmsType = {
  prop: string;
  label: string;
  slotName?: string;
};
const initData = ref<RUser[]>([]);
const initMeta = ref<Meta>({
  total: 0,
  size: 10
});
const columns: ColunmsType[] = [
  {
    prop: 'id',
    label: 'ID'
  },
  {
    prop: 'username',
    label: '用户名'
  },
  {
    prop: 'nickname',
    label: '昵称'
  },
  {
    prop: 'avator',
    label: '头像',
    slotName: 'avator'
  },
  {
    prop: 'role_name',
    label: '角色',
    slotName: 'role'
  },
  {
    prop: 'created_at',
    label: '创建时间'
  },
  {
    prop: 'updated_at',
    label: '编辑时间'
  }
];

const formData = ref({});
const drawer = ref<InstanceType<typeof SailDrawer> | null>(null);
const rules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  newPass: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
});
const header = ref('add');
const pageSizes = [10, 20, 50, 100];

onBeforeMount(() => {
  initMethod();
});
onMounted(() => {
  nextTick(() => {
    // initMethod();
  });
});

const initMethod = () => {
  handleGetUser();
};
const handleGetUser = async () => {
  const { data, meta } = await getUsers();
  initData.value = data;
  initMeta.value = meta;
};
const handleEditUser = (val: RUser) => {
  header.value = 'edit';
  formData.value = { ...val };
  drawer.value?.isOpen();
};

const handleAddUser = () => {
  header.value = 'add';
  formData.value = {};
  drawer.value?.isOpen();
};

const handleSubmit = async (val: any) => {
  await editUser(val);
  drawer.value?.isClose();
  initMethod();
};

const handleDelUser = (val: number) => {
  console.log(val);
};

const handleSize = (val: number) => {
  initMeta.value.size = val;
  console.log('val', val);
};

const handleCurrent = (val: number) => {
  initMeta.value.current = val;
};
</script>

<template>
  <div>
    <div class="tools">
      <el-button type="primary" @click="handleAddUser">新增</el-button>
    </div>
    <el-card>
      <el-table :data="initData" stripe height="60vh">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template v-if="item?.slotName === 'role'" #default="scope">
            <div>{{ scope.row[item.prop] === 'admin' ? '管理员' : '普通用户' }}</div>
          </template>
          <template v-if="item?.slotName === 'avator'" #default="scope">
            <el-avatar v-if="scope.row[item.prop] !== ''" :size="30" :src="scope.row[item.prop]" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120" class-name="operate">
          <template #default="scope">
            <div @click="handleEditUser(scope.row)">编辑</div>
            <div type="danger" text @click="handleDelUser(scope.row.id)">删除</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="sail-page-box">
        <span>总计：{{ initMeta.total }}</span>
        <el-pagination
          layout=" prev, pager, next, sizes, jumper"
          :current-page="initMeta.current"
          :page-sizes="pageSizes"
          :page-size="initMeta.size"
          :total="initMeta.total ?? 0"
          @update:page-size="handleSize"
          @update:current-page="handleCurrent"
        >
          <template #sizes>
            <span>每页显示</span>
            <el-select v-model="initMeta.size" @change="handleSize">
              <el-option
                v-for="size in pageSizes"
                :key="size"
                :label="`${size} 条`"
                :value="size"
              ></el-option>
            </el-select>
            <span>条数据</span>
          </template>
        </el-pagination>
      </div>
    </el-card>
    <sail-drawer
      ref="drawer"
      :header="header"
      :formData="formData"
      :formItemConfig="header === 'add' ? formItem : editItem"
      :formRules="rules"
      @submit="handleSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.tools {
  margin-bottom: 10px;
}
.el-table {
  :deep(.el-table__inner-wrapper) {
    &::before {
      height: 0px;
    }
  }
  :deep(.operate) {
    .cell {
      display: flex;
      > div:first-child {
        margin-right: 10px;
        color: #409eff;
      }
      > div:last-child {
        color: #f56c6c;
      }
    }
  }
}
.sail-page-box {
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-pagination {
    justify-content: end;
  }
}
</style>
