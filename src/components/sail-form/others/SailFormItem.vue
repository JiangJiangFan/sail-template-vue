<script setup lang="ts">
import type { FormConfigType, ResultType } from '../types/index.ts';

// const modelValue = defineModel()

interface Props {
  formData: string | number | undefined;
  formItem: FormConfigType;
}
const emit = defineEmits(['change', 'visible-change', 'input']);

const props = defineProps<Props>();

function handleChange(item: FormConfigType, e: ResultType) {
  emit('change', { item: item, e: e });
}
function handleVisible(item: FormConfigType, e: ResultType) {
  emit('visible-change', { item: item, e: e });
}
function handleInput(item: FormConfigType, e: ResultType) {
  emit('input', { item: item, e: e });
}
</script>
<template>
  <el-select
    v-if="props.formItem.type == 1 || props.formItem.type == 2"
    :multiple="props.formItem.type == 2"
    :disabled="props.formItem?.disabled"
    placeholder="请选择"
    filterable
    clearable
    v-bind="$attrs"
    @change="(e: any) => handleChange(props.formItem, e)"
    @visible-change="(e: any) => handleVisible(props.formItem, e)"
  >
    <template v-if="props.formItem.sel?.field !== undefined">
      <el-option
        v-for="i in props.formItem.sel!.options"
        :key="i[props.formItem.sel!.field.value]"
        :label="i[props.formItem.sel!.field.label]"
        :value="i[props.formItem.sel!.field.value]"
      ></el-option>
    </template>
    <template v-else>
      <el-option
        v-for="i in props.formItem.sel!.options"
        :key="i.value"
        :label="i.label"
        :value="i.value"
      ></el-option>
    </template>
  </el-select>
  <el-input
    v-else-if="props.formItem.type === 3"
    :disabled="props.formItem?.disabled"
    clearable
    v-bind="$attrs"
  ></el-input>
  <el-input-number
    v-else-if="props.formItem.type === 4"
    :disabled="props.formItem.disabled"
    :data-unit="props.formItem.num?.dataUnit"
    :controls="props.formItem.num?.controls ?? false"
    :precision="props.formItem.num?.precision"
    class="numrule"
    clearable
    v-bind="$attrs"
    @change="(e: any) => handleChange(props.formItem, e)"
  ></el-input-number>

  <el-date-picker
    v-else-if="props.formItem.type === 5"
    :clearable="false"
    :type="props.formItem.date?.dateType ?? 'date'"
    :format="props.formItem.date?.format"
    :value-format="props.formItem.date?.valueFormat ?? 'yyyy-MM-dd'"
    v-bind="$attrs"
    @change="(e: any) => handleChange(props.formItem, e)"
  ></el-date-picker>

  <el-radio-group
    v-else-if="props.formItem.type === 6"
    v-bind="$attrs"
    :disabled="props.formItem.disabled"
    @input="(e: any) => handleInput(props.formItem, e)"
  >
    <el-radio
      v-for="(c, k) in props.formItem.rad!.options"
      :key="k"
      :label="c.value"
      :disabled="c.disabled"
    >
      {{ c.label }}
    </el-radio>
  </el-radio-group>
</template>
