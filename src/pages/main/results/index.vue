<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import LASresult from './components/LASresult.vue'

const scale = ref('')
const result = ref<any>()

onLoad((options: any) => {
  scale.value = options.scale
  result.value = JSON.parse(decodeURIComponent(options.result))
})
</script>

<template>
  <view>
    <LASresult v-if="scale === 'LAS'" :result="result" />
  </view>
</template>
