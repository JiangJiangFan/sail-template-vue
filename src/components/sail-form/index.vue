<script setup lang="ts">
import { ref } from 'vue';
import type { FormConfigType } from './types/index.ts';
import SailFormItem from './others/SailFormItem.vue';
import SailGroupBtn from './others/SailGroupBtn.vue';
import { FormInstance } from 'element-plus';

const props = defineProps({
  // 表单标题
  title: {
    type: String,
    default: ''
  },
  // 表单数据
  formData: {
    type: Object,
    default: () => ({})
  },
  // 表单引用名称
  formRef: {
    type: String,
    default: 'formRef'
  },
  // 表单校验规则
  formRules: {
    type: Object,
    default: () => ({})
  },
  // 表单项配置
  formItemConfig: {
    type: Array<FormConfigType>,
    default: () => []
  },
  // 是否显示表单底部
  showFooter: {
    type: Boolean,
    default: true
  },
  // 底部按钮配置
  footerConfig: {
    type: Array,
    default: () => []
  },
  // 编辑页面
  editPage: {
    type: Boolean,
    default: false
  }
});
const formRef = ref<FormInstance>();
const emit = defineEmits(['submit']);
const initData = ref(props.formData);

// 校验表单
const submit = async (cb: FormInstance | undefined) => {
  if (!cb) return;
  await cb.validate((valid, fields) => {
    if (valid) {
      // 通过表单验证
      emit('submit');
    } else {
      console.log('error submit', fields);
    }
  });
};
</script>

<template>
  <el-form
    class="sail-form"
    :model="initData"
    :rules="props.formRules"
    :ref="props.formRef"
    v-bind="$attrs"
  >
    <!-- 表单标题 -->
    <el-row v-if="title">
      <div>{{ title }}</div>
    </el-row>
    <!-- 表单项配置 -->
    <el-form-item
      v-for="(item, index) in props.formItemConfig"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- 编辑单 -->
      <template v-if="editPage">
        <!-- 表单项组件 -->
        <sail-form-item
          v-model:model-value="initData[item.prop]"
          class="sail-form-item"
          :formData.sync="initData[item.prop]"
          :form-item="item"
          v-bind="$attrs"
        />
      </template>
      <!-- <template v-else>{{ item.value ? formData[item.prop] : formData[item.prop] }}</template> -->
    </el-form-item>
    <!-- 表单操作按钮 -->
    <div v-if="props.showFooter">
      <sail-group-btn @submitClick="submit(formRef)">重置</sail-group-btn>
    </div>
  </el-form>
</template>
<style scoped lang="scss">
:deep(.el-form-item) {
  .el-form-item__label {
    width: 60px;
    justify-content: flex-start;
  }
}
</style>
