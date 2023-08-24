<script setup lang='ts'>
const props = defineProps<{
  result: {
    romantic: number
    companion: number
    game: number
    giving: number
    occupy: number
    realistic: number
  }
}>()
</script>

<template>
  <view>
    <view>浪漫型：{{ result.romantic }}</view>
    <view>游戏型：{{ result.game }}</view>
    <view>同伴型：{{ result.companion }}</view>
    <view>现实型：{{ result.realistic }}</view>
    <view>占有型：{{ result.occupy }}</view>
    <view>奉献型：{{ result.giving }}</view>
  </view>
</template>
