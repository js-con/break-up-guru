<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import scaleMap from '@/hooks/scales/index.ts'

const scaleData = ref()

onLoad((options: any) => {
  const scale = options.scale
  if (scale && scaleMap[scale])
    scaleData.value = scaleMap[scale]()
})
</script>

<template>
  <view>
    <view v-if="scaleData">
      <view>{{ scaleData.describe }}</view>
    </view>
  </view>
</template>
