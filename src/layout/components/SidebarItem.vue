<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
interface Props {
  item: RouteRecordRaw;
  basePath?: string;
}
const props = withDefaults(defineProps<Props>(), {
  basePath: ''
});
// const hideMenu = computed(() => {})
function toFormList(item: string, event: any) {
  let temp = event.target.dataset.router;
  router.push({ path: `${item}/${temp}` });
}
// function updateHideMenu() {}
</script>
<template>
  <div
    class="side-menu"
    v-for="child in props.item.children"
    :key="child.path"
    :data-router="child.path"
    @click="toFormList(props.basePath, $event)"
  >
    {{ child.name }}
  </div>
</template>
<style lang="scss" scoped>
.side-menu {
  display: flex;
  color: var(--inactive-color);
  font-weight: 400;
  padding: 5px 10px;
  margin: 0 16px;
  border-radius: 6px;
  transition: 0.3s;
  &:hover {
    background-color: var(--hover-menu-bg);
  }
}
</style>
