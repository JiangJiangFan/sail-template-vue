<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div
    class="sail-loading"
    v-if="isShow"
  >
    <svg-icon name="loading" />
  </div>
</template>
<style scoped>
.sail-loading svg polyline {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sail-loading svg polyline#back {
  fill: none;
  stroke: #ff4d5033;
}

.sail-loading svg polyline#front {
  fill: none;
  stroke: #ff4d4f;
  stroke-dasharray: 48, 144;
  stroke-dashoffset: 192;
  animation: dash_682 1.4s linear infinite;
}

@keyframes dash_682 {
  72.5% {
    opacity: 0;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
