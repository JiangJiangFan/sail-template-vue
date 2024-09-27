<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue';
const router = useRouter();

const routes = computed(() => {
  return router.options.routes;
});
const showMenu = computed(() => {
  return routes.value.filter((item) => !item.meta?.isHide && item.name !== '主页');
});
</script>
<template>
  <div class="left-side">
    <div class="side-wrapper">
      <div class="side-title">
        <router-link to="/home"
          ><div class="svg-title"><svg-icon name="home" />主页</div></router-link
        >
      </div>
    </div>
    <el-menu>
      <el-sub-menu v-for="item in showMenu" :key="item.path" :index="item.path">
        <template #title>
          <div class="svg-title">
            <svg-icon :name="item.meta?.icon ?? ''" />
            {{ item.name }}
          </div>
        </template>
        <sidebar-item :item="item" :base-path="item.path" />
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.left-side {
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px 0 26px 26px;
  height: 100%;
  overflow: auto;
  flex-shrink: 0;
}
.el-menu {
  :deep(.el-sub-menu__title) {
    height: 36px;
    line-height: 36px;
  }
}
.side-title {
  color: var(--inactive-color);
  font-size: var(--el-menu-item-font-size);
  height: 36px;
  line-height: 36px;
  svg {
    width: 16px;
    margin-right: 8px;
  }
}
.side-wrapper + .side-wrapper {
  margin-top: 20px;
}
.svg-title {
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    margin-right: 8px;
  }
}
</style>
