<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const { params, query } = useRoute();
const router = useRouter();

router.replace({ path: '/' + params.path, query: query });
// router.replace({ path: '/', query: route.query });
</script>

<template>
  <div />
</template>
