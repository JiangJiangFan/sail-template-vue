<script setup lang="ts">
import { ref } from 'vue';
import SailUserDialog from './others/SailUserDialog.vue';

const title = '选择成员';
const orgName = '组织';
const levelList = ref([]); // 面包屑
const deptNode = ref([]);
const userNode = ref([]);
const searchNode = ref([]);

const handleSearch = () => {
  console.log('搜索');
};
const handleClick = () => {
  console.log('点击');
};
const handleChange = () => {
  console.log('选择');
};
</script>

<template>
  <div>
    <sail-user-dialog
      :title="title"
      :orgName="orgName"
      :levelList="levelList"
      :deptNode="deptNode"
      :userNode="userNode"
      :searchNode="searchNode"
      @click="handleClick"
      @search="handleSearch"
      @change="handleChange"
    >
    </sail-user-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
