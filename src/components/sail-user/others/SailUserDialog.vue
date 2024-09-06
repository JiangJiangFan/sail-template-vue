<script setup lang="ts">
import SailUserTree from './SailUserTree.vue';
import { ResultType } from '../types';

const checkList: ResultType[] = [];
const resetChecked = () => {
  console.log('清空');
};
const handleDel = (val: ResultType) => {
  console.log('删除', val);
};
const handleClose = () => {
  console.log('取消');
};
const handleSubmit = () => {
  console.log('取消');
};
</script>

<template>
  <div>
    <sail-user-tree v-bind="$attrs"></sail-user-tree>
    <el-divider direction="vertical"></el-divider>
    <div class="selected-box">
      <div class="selected-box__head">
        <div>
          已选择（<span style="color: #2deb79"> {{ checkList.length }}</span
          >）
        </div>
        <el-button type="text" @click="resetChecked">清空</el-button>
      </div>
      <div class="selected-box__body">
        <div v-for="item in checkList" :key="item.id">
          <div>{{ item.name }} <i @click="handleDel(item)" class="el-icon-close" /></div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button @click="handleClose" style="border-color: #656565">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sail-user_tree {
  float: left;
  width: 35%;
}
.el-divider {
  float: left;
  height: 367px;
  background-color: #707070;
  &.el-divider--vertical {
    margin: 0 20px;
  }
}
.selected-box {
  float: left;
  width: 59%;
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__body {
    max-height: 350px;
    overflow-y: auto;
    > div {
      float: left;
      background: #464646;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #727272;
      margin-right: 6px;
      margin-bottom: 6px;
      padding-left: 6px;
      // padding-right: 26px;
      i {
        margin-left: 15px;
        padding-right: 6px;
      }
    }
  }
}
.dialog-footer {
  position: absolute;
  bottom: 1.5vh;
  right: 1vw;

  .el-button {
    width: 65px;
    height: 32px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
