<!--
  每种维度满分35分:
  28 - 35: 倾向强烈
  24 - 27: 一定倾向
  20 - 23: 普通
  < 20: 没有倾向
 -->
<script setup lang='ts'>
import { computed } from 'vue'

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
const HIGH_SCORE_THRESHOLD = 28
const MEDIUM_SCORE_THRESHOLD = 24
const LOW_SCORE_THRESHOLD = 20

const weightMap = [
  { weight: 2, condition: (score: number) => score >= HIGH_SCORE_THRESHOLD },
  { weight: 1.6, condition: (score: number) => score >= MEDIUM_SCORE_THRESHOLD && score < HIGH_SCORE_THRESHOLD },
  { weight: 1.2, condition: (score: number) => score >= LOW_SCORE_THRESHOLD && score < MEDIUM_SCORE_THRESHOLD },
  { weight: 0.8, condition: (score: number) => score < LOW_SCORE_THRESHOLD },
]
const dimensions = computed(() => {
  const { romantic, companion, game, giving, occupy, realistic } = props.result
  return [
    { chName: '浪漫型', score: romantic, desc: '这种类型比较注重对方的形象和气质，帅气，或者是漂亮就容易爱上，这种类型的爱情态度，容易获得幸福感，满足感，但是也可能存在潜在的一定的危机，比如缺乏价值感。' },
    { chName: '同伴型', score: companion, desc: '这种类型的爱情态度通常是持续的，缓慢的，显得平静祥和，这种爱情态度适合一步步的发展，比如初识到朋友，再到恋人的过程，这期间的过程可能并不快。' },
    { chName: '游戏型', score: game, desc: '把爱情当做游戏，这种类型的爱情通常会比较短暂，缺乏责任和诚信，短期交往可能不觉得，但是随着时间的推移，必定会暴露，也即是爱情结束的时刻。' },
    { chName: '奉献型', score: giving, desc: '这种类型跟占有型正好是反着来的，他们乐于奉献不求回报，这类人具有较强的忍耐性，甚至有些人连嫉妒心都可以没有，当然没有绝对的奉献，在爱情上，双方是平等的互相尊重的，如果真的一方长期付出，而得不到另一方的尊重，这种奉献也是会终止的。' },
    { chName: '占有型', score: occupy, desc: '这类爱情态度表示占有的欲望，独占的心理，容易出现嫉妒心理，容易产生吃醋心理，为人性格比较敏感，多疑，善思，情绪不稳定，容易大喜大悲。' },
    { chName: '现实型', score: realistic, desc: '现实型的爱情态度比较注重实际，有这自己明确的择偶条件和标准，比如要求对方身高，学历，经济能力等，也有可能是要求对方具有某些兴趣爱好，脾气秉性，家庭背景等。 ' },
  ]
})

const conclusion = computed(() => {
  // 输出分值最大的描述
  const maxScore = Math.max(...dimensions.value.map(i => i.score))
  const maxScoreObjs = dimensions.value.filter(i => i.score === maxScore)

  const description = `你的爱情态度是${maxScoreObjs[0].chName}：${maxScoreObjs[0].desc}`
  const type = maxScoreObjs[0].chName

  return { type, description }
})

function getPercent(score: number) {
  if (!score)
    return 0
  for (const item of weightMap) {
    if (item.condition(score))
      return score * item.weight / 35 * 100
  }
  return score / 35 * 100
}
</script>

<template>
  <view class="LAS-result slit-in-vertical">
    <view class="scale-name">
      LAS爱情态度测试
    </view>
    <view class="title tracking-in-contract">
      你的测试结果是：<text class="text-focus-in">
        {{ conclusion.type }}
      </text>
    </view>
    <view class="dimensions">
      <view
        v-for="item in dimensions"
        :key="item.chName"
        class="dimensions__item text-focus-in"
      >
        <view class="dimensions__item-name">
          {{ item.chName }}
        </view>
        <view class="dimensions__item-score">
          <view
            class="dimensions__item-score__inner"
            :style="{ width: `${getPercent(item.score)}%` }"
          />
        </view>
      </view>
    </view>
    <view class="conclusion text-focus-in">
      {{ conclusion.description }}
    </view>
  </view>
</template>

<style lang="scss">
$slide-in-bottom-properties: slide-in-bottom(1.2s);

.LAS-result{
  .slide-in {
    @each $name, $val in $slide-in-bottom-properties {
      #{$name}: $val;
    }
  }
  padding: 96rpx;
  .scale-name{
    margin-bottom: 24rpx;
    font-size: 34px;
  }
  .title{
    margin-bottom: 96rpx;
    font-size: 22px;
  }
  .dimensions{
    display: flex;
    flex-direction: column;
    gap: 64rpx;
    &__item{
      display: flex;
      align-items: center;
      &-name{
        margin-right: 24rpx;
        font-size: 14px;
      }
      &-score{
        width: 325rpx;
        &__inner{
          width: 0;
          height: 4rpx;
          background-color: #999;
          transition: width 5s;
        }
      }
    }
  }
  .conclusion{
    margin-top: 48rpx;
    font-size: 16px;
  }

}
</style>
