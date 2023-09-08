<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import LASresult from './components/LASresult.vue'
import ECRresult from './components/ECRresult.vue'

const scale = ref('')
const result = ref<any>()

onLoad((options: any) => {
  scale.value = options.scale
  console.log('options:', options)
  result.value = JSON.parse(decodeURIComponent(options.result))
})
</script>

<template>
  <view>
    <LASresult v-if="scale === 'LAS'" :result="result" />
    <ECRresult v-if="scale === 'ECR'" :result="result" />
  </view>
</template>
