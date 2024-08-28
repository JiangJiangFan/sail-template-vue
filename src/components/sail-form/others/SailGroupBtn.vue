<script setup lang="ts"></script>
<template>
  <div class="sail-form-btns">
    <el-button class="sail-btn-success" @click="$emit('submitClick')"> 提交 </el-button>
    <el-button>取消</el-button>
    <el-button><slot /></el-button>
  </div>
</template>

<style lang="scss" scoped>
.sail-form-btns {
  display: flex;
  align-items: center;
}

.el-button {
  width: 110px;
  height: 32px;
  background: #262626;
  border-radius: 6px 6px 6px 6px;
  border: 1px solid #656565;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #b9b9b9;
}
.sail-btn-success {
  width: 90px;
  background: #17be59;
  color: #fff;
  border: none;
}
</style>
