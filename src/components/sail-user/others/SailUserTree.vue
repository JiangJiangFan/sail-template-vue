<script setup lang="ts">
import { CheckboxValueType } from 'element-plus';
import { ref, toRefs } from 'vue';
import { ResultType } from '../types';

const props = defineProps({
  title: String,
  orgName: String, // 组织名
  levelList: Array as () => ResultType[], // 组件面包屑
  deptNode: Array as () => ResultType[], // 部门节点
  userNode: Array as () => ResultType[], // 用户节点
  searchNode: Array as () => ResultType[], // 查询节点
  search: Function, // 查询方法
  change: Function, // 选择方法
  click: Function, // 点击方法
  showUser: { type: Boolean, default: true } // 是否显示用户
});

const { search, change, click } = toRefs(props);

const filterText = '';
const isSearch = ref(false);
const deptGroup = ref([]);
const userGroup = ref([]);
const searchGroup = ref([]);

// 搜索方法
const handleSearch = (val: string) => {
  if (`${val}` !== '' && search?.value) {
    search.value(val);
  }
};

// 点击进入子级
const handleClick = (val: ResultType) => {
  if (click?.value) {
    click.value(val);
  }
};

// 选择当前
const handleChange = (val: ResultType, e: CheckboxValueType, type: string) => {
  if (e && change?.value) {
    change.value(val, type);
  }
};
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
      <el-breadcrumb separator-icon=">">
        <el-breadcrumb-item>{{ props.orgName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in props.levelList" :key="index">{{
          item.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="result-box">
        <el-checkbox-group v-model:dept-group="deptGroup">
          <el-checkbox
            v-for="(item, index) in props.deptNode"
            :key="`${item.name}${index}`"
            :checked="item.isChecked"
            :label="item.id"
            @change="(e) => handleChange(item, e, 'dept')"
          >
            <p @click.prevent="handleClick(item)">{{ item.name }}</p>
          </el-checkbox>
        </el-checkbox-group>
        <template v-if="showUser">
          <el-checkbox-group v-model:user-group="userGroup">
            <el-checkbox
              v-for="(item, index) in props.userNode"
              :key="`${item.name}${index}`"
              :checked="item.isChecked"
              :label="item.id"
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
        <el-checkbox-group v-model:search-group="searchGroup">
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

<style lang="scss" scoped></style>
