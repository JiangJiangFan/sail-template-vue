<template>
  <section class="app-main">
    <div class="main-header"></div>
    <div class="content-wrapper">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </section>
  <!--  -->
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  .main-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    margin-right: 20px;
    height: 36px;
    flex-shrink: 0;
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
    margin-right: 20px;
    @media screen and (max-width: 510px) {
      padding: 20px;
    }
  }
}
</style>
