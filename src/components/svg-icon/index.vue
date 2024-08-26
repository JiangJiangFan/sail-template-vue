<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  prefix?: string
  name: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  size: '1em'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg
    class="svg-icon"
    :class="`svg-${name}`"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  overflow: hidden;
}
</style>
