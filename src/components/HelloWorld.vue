<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '@/apis/user'

defineProps<{ msg: string }>()
const data = ref()
const handleGetUsers = () => {
  getUsers().then((res) => {
    data.value = res.data
  })
}
onMounted(() => {
  handleGetUsers()
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <p class="read-the-docs">{{ data }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
