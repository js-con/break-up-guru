<script setup lang='ts'>
import { computed } from 'vue'

const props = defineProps<{
  type: 'primary' | 'info' | 'success' | 'warning' | 'error'
}>()

const styleObj = computed(() => {
  const colorMap = {
    primary: '#58dcaf',
    info: '#69b6e2',
    success: '#58dcaf',
    warning: '#eec478',
    error: '#e37877',
  }
  return {
    color: colorMap[props.type],
  }
})
</script>

<template>
  <view class="g-button" :style="styleObj">
    <slot />
  </view>
</template>

<style scoped lang="scss">
.g-button{
  height: 34px;
  font-size: 14px;
  border-radius: 3px;
  background-color: $uni-btn-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active{
    background-color: $uni-btn-bg-color-active;
    transition: color .3s cubic-bezier(.4, 0, .2, 1),
      background-color .3s cubic-bezier(.4, 0, .2, 1),
      box-shadow .3s cubic-bezier(.4, 0, .2, 1),
      border-color .3s cubic-bezier(.4, 0, .2, 1);
  }
}
</style>
