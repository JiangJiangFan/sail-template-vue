<script lang="ts" setup></script>

<template>
  <div class="header">
    <div class="header-profile">
      <div class="notification">
        <span class="notification-number">3</span>
        <svg-icon name="news" />
      </div>
      <div>
        <svg-icon name="theme" />
      </div>
    </div>
    <div class="profile-img">
      <svg-icon name="avatar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 0 30px;
  white-space: nowrap;
  @media screen and (max-width: 480px) {
    padding: 0 16px;
  }
  &-menu {
    display: flex;
    align-items: center;
    a {
      padding: 20px 30px;
      text-decoration: none;
      color: var(--inactive-color);
      border-bottom: 2px solid transparent;
      transition: 0.3s;
      @media screen and (max-width: 610px) {
        &:not(.main-header-link) {
          display: none;
        }
      }
      &.is-active,
      &:hover {
        color: var(--theme-color);
        border-bottom: 2px solid var(--theme-color);
      }
    }
  }
}
.header-profile {
  display: flex;
  align-items: center;
  padding: 0 16px 0 40px;
  margin-left: auto;
  flex-shrink: 0;
  > div {
    margin-left: 20px;
  }
}

.notification {
  position: relative;
  &-number {
    position: absolute;
    background-color: #3a6df0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    right: -6px;
    top: -6px;
  }
  & + svg {
    margin-left: 22px;
    @media screen and (max-width: 945px) {
      display: none;
    }
  }
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 0px solid var(--theme-color);
  .svg-avatar {
    cursor: pointer;
    width: 30px !important;
    height: 30px !important;
    color: var(--avatar-color) !important;
  }
}
.svg-icon {
  width: 20px;
  height: 20px;
  color: #f9fafb;
  flex-shrink: 0;
}
</style>
