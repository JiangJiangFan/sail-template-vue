<script setup lang="ts">
import { ref } from 'vue';
import SailForm from '@/components/sail-form/index.vue';

const props = defineProps({
  header: {
    type: String,
    default: 'add'
  },
  size: {
    type: String || Number,
    default: '40%'
  }
});
const emits = defineEmits(['submit-drawer', 'update:visibleDrawer']);

const drawer = ref(false);
const sailForm = ref<InstanceType<typeof SailForm> | null>(null);

const handleConfirm = () => {
  sailForm.value?.handleSubmit();
};
const isClose = () => {
  drawer.value = false;
  sailForm.value?.handleReset();
};
const isOpen = () => {
  drawer.value = true;
};

// 暴露
defineExpose({
  isOpen,
  isClose
});
</script>

<template>
  <div>
    <el-drawer v-model="drawer" @close="isClose" :size="props.size" :destroy-on-close="true">
      <template #header>
        <div>{{ props.header === 'add' ? '新增' : '编辑' }}</div>
      </template>
      <template #default>
        <sail-form ref="sailForm" edit-page :show-footer="false" v-bind="$attrs" />
      </template>
      <template #footer>
        <div>
          <el-button @click="isClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
