<script setup lang="ts">
function toScale(scale: string) {
  uni.redirectTo({ url: `/pages/main/scale/index?scale=${scale}` })
}
</script>

<template>
  <view class="content">
    <view>
      请选择题目
    </view>
    <view class="scale-list">
      <view class="scale-list__item" @click="toScale('LAS')">
        LAS爱情态度测试
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .scale-list{
    &__item{

    }
  }
}
</style>
