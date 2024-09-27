<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside><sidebar /></el-aside>
      <el-container class="content-main">
        <el-header><navbar /></el-header>
        <el-container>
          <app-main />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { AppMain, Navbar, Sidebar } from './components';
</script>
<style lang="scss" scoped>
.el-aside {
  width: 200px;
  background-color: var(--theme-left-color);
}
.app-wrapper {
  // background-color: var(--theme-bg-color);
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: calc(100vw - 100px);
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
}
.content-main {
  background-color: var(--theme-bg-color);
}
.el-header {
  background-color: var(--theme-header-color);
}
</style>
