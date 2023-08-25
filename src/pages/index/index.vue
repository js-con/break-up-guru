<script setup lang="ts">
import { ref } from 'vue'
import GButton from '@/components/Button.vue'

function toScale(scale: string) {
  uni.redirectTo({ url: `/pages/main/scale/index?scale=${scale}` })
}

const scaleList = ref([
  {
    name: 'LAS',
    title: 'LAS爱情态度测试',
    desc: '爱情态度量表LAS由美国心理学家Hendrick编制，将爱情态度分为6种类型：浪漫型、游戏型、伴侣型、现实型、实用型和奉献型。不同的类型对待爱情的态度存在非常大的差异，通过爱情态度量表的测试，可以帮助我们树立正确的爱情观。',
  },
])
</script>

<template>
  <view class="content">
    <view class="scale-list">
      <view
        v-for="scale in scaleList"
        :key="scale.name"
        class="scale-list__item"
        @click="toScale('LAS')"
      >
        <view class="scale-list__item-title">
          {{ scale.title }}
        </view>
        <view class="scale-list__item-desc">
          {{ scale.desc }}
        </view>
        <GButton type="primary">
          开始测试
        </GButton>
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
  }

  .test{
    width: 700rpx;
    height: 325rpx;
    background-color: #333;
  }

  .scale-list{
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    padding: 20rpx;
    width: 700rpx;
    height: 375rpx;
    &__item{
      padding: 24rpx;
      background-color: #17171a;
      border-radius: 10rpx;
      border: 1px solid $uni-border-color;
      &-title{
        margin-bottom: 12rpx;
        font-family: '黑体', sans-serif;
        font-size: 22px;
        font-weight: bold;
      }
      &-desc{
        margin-bottom: 12rpx;
        font-family: '微软雅黑', sans-serif;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
