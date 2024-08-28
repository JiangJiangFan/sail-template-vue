<script setup lang="ts">
import SailForm from '@/components/sail-form/index.vue';
import { formItem } from './formItem';

const formData = {
  username: 'Jiang'
};
const submit = () => {
  console.log(formData);
};
</script>
<template>
  <sail-form
    editPage
    :formData.sync="formData"
    :formItemConfig="formItem"
    @submit="submit"
  ></sail-form>
</template>
