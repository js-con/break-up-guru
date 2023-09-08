<script setup lang='ts'>
import { computed, ref } from 'vue'
import GButton from '@/components/Button.vue'

const props = defineProps<{
  scaleData: {
    id: string
    name: string
    describe: string
    questions: string[]
    options: string[]
    submit: (answer: number[]) => unknown
  } }>()

const pageNo = ref(0)
const question = computed(() => props.scaleData?.questions[pageNo.value])
const answers = ref<number[]>([])

const isStart = ref(false)
function onStart() {
  isStart.value = true
  console.log('scaleData:', props.scaleData)
}

const progressWidth = computed(() => {
  const total = props.scaleData.questions.length || 0
  const cur = pageNo.value
  if (pageNo.value === total - 1)
    return '100%'
  const progress = `${Math.ceil(cur / total * 100)}%`

  return progress
})

function onOptionClick(idx: number) {
  // 修改
  if (pageNo.value < answers.value.length) {
    answers.value[pageNo.value] = idx
  }
  else {
  // 新增
    answers.value.push(idx)
  }
  nextPage()
}

function nextPage() {
  if (pageNo.value < props.scaleData.questions.length - 1)
    pageNo.value += 1
}
function prevPage() {
  if (pageNo.value > 0)
    pageNo.value -= 1
}

function toResult() {
  if (answers.value.length !== props.scaleData.questions.length)
    return
  const result = props.scaleData.submit(answers.value)
  uni.redirectTo({ url: `/pages/main/results/index?scale=${props.scaleData.id}&result=${JSON.stringify(result)}` })
}
</script>

<template>
  <view v-if="scaleData" class="scale">
    <view v-if="!isStart" class="describe">
      <view class="title">
        {{ props.scaleData.name }}
      </view>
      <view class="content">
        <view
          v-for="paragraph in scaleData.describe"
          :key="paragraph"
          class="paragraph"
        >
          {{ paragraph }}
        </view>
      </view>
      <GButton
        class="g-button"
        type="primary"
        @tap="onStart"
      >
        开始答题
      </GButton>
    </view>
    <view v-else>
      <view class="progress">
        <view
          :style="`width:${progressWidth}`"
          class="progress__inner"
        />
      </view>
      <view class="body">
        <view class="question">
          {{ question }}
        </view>
        <view class="options">
          <view
            v-for=" option, idx in scaleData.options"
            :key="option"
            class="options__item"
            :style="`color:${answers[pageNo] === idx ? '#58dcaf' : ''}`"
            @click="() => onOptionClick(idx)"
          >
            {{ option }}
          </view>
        </view>
      </view>
      <view class="pagination">
        <view v-if="pageNo > 0" class="back" @click="prevPage">
          上一题
        </view>
        <GButton
          v-if="pageNo >= scaleData.questions.length - 1"
          class="check-result"
          type="primary"
          @tap="toResult"
        >
          查看结果
        </GButton>
      </view>

      <!-- <view>answers:{{ answers }}</view>
      <view>page:{{ pageNo }}</view> -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scale{
  padding: 48rpx;
  .describe{
    .title{
      margin: 32rpx 0;
      font-size: 28px;
    }
    .content{
      .paragraph{
        margin-top: 24rpx;
        font-size: 14px;
      }
    }
    .g-button{
      position: fixed;
      bottom: 96rpx;
      width: calc(100% - 96rpx);
      left: 48rpx;
    }
  }
  .progress{
    margin-left: -48rpx;
    width: calc(100% + 96rpx);
    height: 2px;
    background-color: #999;
    &__inner{
      background-color: #fff;
      height: 2px;
    }
  }
  .body{
    margin-top: 48rpx;
    .question{
      height: 88rpx;
    }
    .options{
      margin-top: 48rpx;
      display: flex;
      flex-direction: column;
      &__item{
        box-sizing: border-box;
        padding: 32rpx 20rpx;
        height: 88rpx;
        display: flex;
        align-items: center;
        border-radius: $uni-border-radius-base;
        background-color: #2f2f31;
        &:active{
          background-color: #444446;
          color:$uni-color-primary;
        }
        &:not(:first-of-type){
          margin-top: 16rpx;
        }
      }
    }
  }
  .pagination{
    margin-top: 16rpx;
    display: flex;
    .back{
      margin-right: 24rpx;
      padding: 12rpx 0;
      width: 128rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $uni-border-radius-lg;
      color: #000;
      font-weight: bold;
      background-color: #2f2f31;
    }
    .check-result{
      flex: 1;
    }
  }
}
</style>
