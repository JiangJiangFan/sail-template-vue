<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const form = ref({
  username: '',
  password: ''
});

const onSubmit = () => {
  userStore.login(form.value).then(() => {
    // 登录成功后跳转到首页
    router.push({ path: '/' });
  });
};
</script>
<template>
  <div class="login-box">
    <div class="left">
      <el-form :model="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" type="password" show-password />
        </el-form-item>
        <div class="input-block">
          <span class="forgot"><a href="#">忘记密码</a></span>
          <el-button @click="onSubmit">登录</el-button>
        </div>
      </el-form>
    </div>
    <div class="right">
      <div class="img"><svg-icon name="back" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 15px;
  display: flex;
  width: 520px;
  height: 500px !important;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff25;
  border-radius: 15px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.03);
  border: 0.1px solid rgba(128, 128, 128, 0.178);
  .left {
    width: 66%;
    height: 100%;
    ::v-deep(.el-form) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      left: 0;
      backdrop-filter: blur(20px);
      position: relative;
      &::before {
        position: absolute;
        content: '';
        width: 40%;
        height: 40%;
        right: 1%;
        z-index: -1;
        background: radial-gradient(
          circle,
          rgb(194, 13, 170) 20%,
          rgb(26, 186, 235) 60%,

          rgb(26, 186, 235) 100%
        );
        filter: blur(70px);
        border-radius: 50%;
      }
    }
  }
  .right {
    width: 34%;
    height: 100%;
    .img {
      width: 34%;
      // height: auto;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      .svg-back {
        width: 180px;
        height: 180px;
      }
    }
  }
}

.login-box::after {
  position: absolute;
  content: '';
  width: 80%;
  height: 80%;
  right: -40%;
  background: rgb(157, 173, 203);
  background: radial-gradient(circle, rgba(157, 173, 203, 1) 61%, rgba(99, 122, 159, 1) 100%);
  border-radius: 50%;
  z-index: -1;
}

::v-deep(.el-input),
.el-button {
  background: rgba(253, 253, 253, 0);
  outline: none;
  border: 1px solid rgba(255, 0, 0, 0);
  border-radius: 0.5rem;
  padding: 5px;
  margin: 10px auto;
  width: 80%;
  display: block;
  color: #425981;
  font-weight: 500;
  font-size: 1.1em;
}

.input-block {
  position: relative;
}

.forgot {
  display: block;
  margin: 5px 0 10px 0;
  margin-left: 35px;
  color: #5e7eb6;
  font-size: 0.9em;
}

.el-button {
  background-color: #5e7eb6;
  color: white;
  font-size: medium;
  box-shadow: 2px 4px 8px rgba(70, 70, 70, 0.178);
}

a {
  color: #5e7eb6;
}

.el-input {
  box-shadow:
    inset 4px 4px 4px rgba(165, 163, 163, 0.315),
    4px 4px 4px rgba(218, 218, 218, 0.13);
  ::v-deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    border-width: 0px !important;
  }
}
</style>
