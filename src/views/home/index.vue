<script setup lang="ts">
import type { RUser } from '@/apis/types/response';
import { getUsers } from '@/apis/user.ts';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Meta } from '@/apis/types/meta';

const initData = ref<RUser>();
const initMeta = ref<Meta>({});

onBeforeMount(() => {
  initMethod();
});
onMounted(() => {});

const initMethod = () => {
  handleGetUser();
};
const handleGetUser = async () => {
  const userStore = useUserStore();
  const user = userStore.username;
  const { data, meta } = await getUsers({ value: user });
  initData.value = data[0];
  initMeta.value = meta;
};
</script>
<template>
  <div>
    <el-card style="max-width: 265px">
      <template #header>
        <div class="card-header">
          <el-avatar :size="50" :src="initData?.avator" fit="cover" />
          <div class="card-header-title">
            <div>{{ initData?.nickname }}</div>
            <div>{{ initData?.role_name === 'admin' ? '管理员' : '普通' }}</div>
          </div>
        </div>
      </template>
      <div>创建时间：{{ initData?.created_at }}</div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.card-header {
  display: flex;
  &-title {
    line-height: 25px;
    margin-left: 10px;
    > div:first-child {
      font-size: 16px;
    }
    > div:last-child {
      color: #c0c4cc;
      font-size: 14px;
    }
  }
}
</style>
