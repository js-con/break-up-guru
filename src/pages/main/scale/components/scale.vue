<script setup lang='ts'>
import { computed, ref } from 'vue'

const props = defineProps<{
  scaleData: {
    describe: string
    questions: string[]
    options: string[]
    submit: (answer: number[]) => unknown
  } }>()

const pageNo = ref(0)
const question = computed(() => props.scaleData?.questions[pageNo.value])
const answers = ref<number[]>([])

function onOptionClick(idx: number) {
  // 修改
  if (pageNo.value < answers.value.length) {
    answers.value[pageNo.value] = idx
  }
  else {
  // 新增
    answers.value.push(idx)
    nextPage()
  }
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
  uni.redirectTo({ url: `/pages/main/results/index?scale=LAS&result=${JSON.stringify(result)}` })
}
</script>

<template>
  <view v-if="scaleData">
    <view class="describe">
      {{ scaleData.describe }}
    </view>
    -----------------------------
    <view class="body">
      <view class="question">
        {{ question }}
      </view>
      -------------------------
      <view class="options">
        <view
          v-for=" option, idx in scaleData.options"
          :key="option"
          class="options__item"
          @click="() => onOptionClick(idx)"
        >
          {{ option }}
        </view>
      </view>
      <view class="question" />
    </view>
    ---------------------------------
    <view class="pagination">
      <view v-if="pageNo > 0" @click="prevPage">
        上一题
      </view>
      <view v-if="pageNo < scaleData.questions.length - 1" @click="nextPage">
        下一题
      </view>
      <view v-else @click="toResult">
        查看结果
      </view>
    </view>
  </view>
</template>
