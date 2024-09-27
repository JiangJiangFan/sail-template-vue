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
    padding: 0 20px;
    height: 24px;
    flex-shrink: 0;
    background-color: var(--theme-header-color);
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    // color:
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
    // margin: 10px 20px;
    @media screen and (max-width: 510px) {
      padding: 20px;
    }
  }
}
</style>
