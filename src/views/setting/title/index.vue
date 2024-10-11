<script setup lang="ts">
import SailForm from '@/components/sail-form/index.vue';
import { formItem } from './formItem';
// import { getUsers } from '@/apis/user.ts';
import { onBeforeMount } from 'vue';
// import Quill from 'quill';

const formData = {
  username: 'Jiang'
};
const submit = () => {
  console.log(formData);
};
// const quill = new Quill('#quill', {
//   theme: 'snow'
// });

onBeforeMount(() => {
  // handleGetUser();
});
// const handleGetUser = async () => {
//   const { data, meta } = await getUsers();

//   console.log(data);
//   console.log(meta);
// };
</script>
<template>
  <el-card>
    <template #header>
      <div>表单</div>
    </template>
    <sail-form
      editPage
      :formData.sync="formData"
      :formItemConfig="formItem"
      @submit="submit"
    ></sail-form>
  </el-card>
</template>
<style lang="css" scoped></style>
