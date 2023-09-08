<script setup lang='ts'>
const props = defineProps<{
  result: {
    safety: number
    obsession: number
    fear: number
    cold: number
  }
}>()
</script>

<template>
  <view>{{ result.safety }}</view>
  <view>{{ result.obsession }}</view>
  <view>{{ result.fear }}</view>
  <view>{{ result.cold }}</view>
</template>
