<script setup lang="ts">
import SailUserTree from './SailUserTree.vue';
import { ResultType, ChooseType } from '../types';
import { useAttrs, ref, computed } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    require: true
  }
});

const emit = defineEmits(['update:visible']);
const attrs = useAttrs();
const treeRef = ref();

const title = attrs.title as string;
const current = attrs.current as ChooseType;

const checkList = computed(() => {
  return current.user;
});

const handleReset = () => {
  treeRef.value.handleReset();
};
const handleDel = (val: ResultType) => {
  treeRef.value.handleDel(val);
};
const handleClose = () => {
  treeRef.value.handleReset();
  emit('update:visible', false);
};
const handleSubmit = () => {
  treeRef.value.handleSubmit();
  emit('update:visible', false);
};
</script>

<template>
  <el-dialog
    :title="title"
    :visible.sync="props.visible"
    :before-close="handleClose"
    width="40%"
    append-to-body
  >
    <sail-user-tree v-bind="$attrs" ref="treeRef"></sail-user-tree>
    <el-divider direction="vertical"></el-divider>
    <div class="selected-box">
      <div class="selected-box__head">
        <div>
          已选择（<span style="color: #2deb79"> {{ checkList.length }}</span
          >）
        </div>
        <el-button type="text" @click="handleReset">清空</el-button>
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
  </el-dialog>
</template>

<style lang="scss" scoped>
::v-deep(.el-dialog) {
  width: 654px;
  height: 520px;
  background: #262626;
  box-shadow: 0px 10px 30px 1px rgba(0, 0, 0, 0.82);
  border-radius: 12px 12px 12px 12px;
  opacity: 1;
  z-index: 9999;
  .el-dialog__header {
    .el-dialog__title {
      display: flex;
      font-weight: bold;
      margin-left: 14px;
    }
  }
}
.sail-user_tree {
  float: left;
  width: 35%;
}
.sail-dept_tree {
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
