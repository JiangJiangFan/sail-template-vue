<script setup lang="ts">
import { CheckboxValueType } from 'element-plus';
import { ref } from 'vue';
import { ResultType } from '../types';

const props = defineProps({
  initValue: Array, // 初始值
  current: {
    type: Object,
    require: true
  }, // 当前选中值
  deptToUser: Object, // 当前部门选定用户
  title: String,
  org: Object as () => ResultType, // 组织名
  levelList: Array as () => ResultType[], // 组件面包屑
  deptNode: Array as () => ResultType[], // 部门节点
  userNode: Array as () => ResultType[], // 用户节点
  searchNode: Array as () => ResultType[] // 查询节点
});
const emit = defineEmits([
  'search',
  'change',
  'click',
  'un-change',
  'update:current',
  'update:initValue'
]);

const filterText = '';
const isSearch = ref(false);
const currentData = props.current ?? {};

// 搜索方法
const handleSearch = (val: string) => {
  if (`${val}` !== '') {
    isSearch.value = true;
    emit('search', val);
  } else {
    isSearch.value = false;
  }
};

// 点击进入子级
const handleClick = (val?: ResultType) => {
  emit('click', val);
};

// 选择当前
const handleChange = (val: ResultType, e: CheckboxValueType, type: string) => {
  if (e) {
    emit('change', { val: val, type: type });
  } else {
    emit('un-change', { val: val, type: type });
  }
};

const handleDel = (val: ResultType) => {
  console.log('删除：', val);
};

const handleReset = () => {
  currentData.value = {
    user: [],
    dept: [],
    search: []
  };
  emit('update:current', currentData.value);
};

const handleSubmit = () => {
  const temp = currentData.user.map((m: string) => {
    return JSON.parse(m);
  });
  emit('update:initValue', temp);
};

// 主动暴露子组件方法，方便在外部调用
defineExpose({ handleDel, handleReset, handleSubmit });
</script>

<template>
  <div class="sail-user_tree">
    <el-input
      v-model.trim="filterText"
      size="small"
      :placeholder="props.title"
      clearable
      @clear="isSearch = false"
      @keyup.enter.native="handleSearch(filterText)"
    >
      <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch(filterText)"></i>
    </el-input>
    <div v-if="!isSearch">
      <div class="breadcrumb">
        <span @click="handleClick(org)">{{ org?.name }}</span>
        <span v-for="(item, index) in levelList" :key="index">
          <i class="el-icon-arrow-right"></i>
          <span @click="handleClick(item)">{{ item.name }}</span>
        </span>
      </div>
      <div class="result-box">
        <el-checkbox-group v-model="currentData.dept">
          <el-checkbox
            v-for="(item, index) in props.deptNode"
            :key="`${item.name}${index}`"
            :indeterminate="item.isChecked"
            :label="item.id"
            @change="(e) => handleChange(item, e, 'dept')"
          >
            <p @click.prevent="handleClick(item)">{{ item.name }}</p>
          </el-checkbox>
        </el-checkbox-group>
        <template>
          <el-checkbox-group v-model="currentData.user">
            <el-checkbox
              v-for="(item, index) in props.userNode"
              :key="`${item.name}${index}`"
              :label="JSON.stringify({ id: item.id, name: item.name })"
              @change="(e) => handleChange(item, e, 'user')"
            >
              <svg-icon name="vue" /><span>{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </div>
    <div v-if="isSearch">
      <div>搜索结果</div>
      <div class="search-result-box">
        <el-checkbox-group v-model="currentData.search">
          <el-checkbox
            v-for="(item, index) in searchNode"
            :key="index"
            :label="item.id"
            @change="(e) => handleChange(item, e, 'search')"
          >
            <template v-slot:default>
              <div>
                <div class="result-name" v-html="item.name"></div>
                <div class="result-dept">{{ item.dept }}</div>
              </div>
            </template>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sail-user_tree {
  .el-input {
    width: 220px;
  }
  .el-breadcrumb {
    margin-left: 15px;
    line-height: 30px;
    height: 30px;
  }
  .result-box {
    margin-top: 10px;
    height: 320px;
    overflow-y: auto;
    overflow-x: hidden;
    .el-checkbox {
      width: 95%;
      height: 33px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-left: 14px;
      .el-checkbox__label {
        padding-left: 0.5vw;
        > .svg-icon {
          width: 15px;
          height: 15px;
          transform: translateY(2px);
          margin-right: 5px;
        }
        > span {
          margin-left: 5px;
        }
      }
    }
  }
  .search-result {
    &:first-child {
      margin-top: 10px;
    }
    &-box {
      height: 320px;
      overflow-y: auto;

      ::v-deep(.el-checkbox) {
        height: 60px;
        display: flex;
        &:hover {
          background: #373737;
        }
        border-radius: 6px 6px 6px 6px;
        .el-checkbox__input {
          line-height: 60px;
          margin-left: 12px;
          &:not(.is-checked) {
            .el-checkbox__inner {
              border-color: #707070;
            }
          }
          &.is-checked + .el-checkbox__label {
            color: #e8e8e8;
          }
        }
        .el-checkbox__label {
          font-size: 16px;
          height: 60px;

          > div {
            height: 60px;
            display: flex;
            color: #e8e8e8;
            flex-direction: column;
            justify-content: center;
            .result-dept {
              font-size: 14px;
              font-weight: 400;
              color: #b9b9b9;
            }
          }
        }
      }
    }
  }
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 4px;
}
</style>
