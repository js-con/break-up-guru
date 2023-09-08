import { type MaybeRef, ref, unref } from 'vue'

export function useECR() {
  const id = 'ECR'
  const name = 'ECR成人依恋量表'

  const describe = [
    '以下选项与你在恋爱关系中的感受有关,',
    '如果你尚未有恋爱经历，请根据与你最亲近的朋友的交往情况作答,',
    '或者，请您想像一个理想的伴侣作答,',
    '请针对每一题项所叙述的情形，选出您认为最能反映您实际状况的选项。',
  ]

  const result = ref({
    safety: 0,
    obsession: 0,
    fear: 0,
    cold: 0,
  })

  const questions = ref([
    '无论我心情多么的低落，我都不愿意向恋人袒露',
    '我担心会被抛弃',
    '和恋人亲密相处，我感到非常舒服',
    '我很担心我的恋爱关系',
    '当恋人开始要跟我亲近时，我会不由自主地想要逃避',
    '我担心恋人不会像我关心他（／她）那样地关心我',
    '当恋人希望跟我非常亲近时，我会觉得不自在',
    '我有点担心会失去恋人',
    '我觉得对恋人开诚布公，让我感到不舒服',
    '我常常希望恋人对我的感情和我对她（／他）的感情一样强烈',
    '我想与恋人亲近，但我又总是会退缩不前',
    '我常常想与恋人形影不离，但有时这样会把她（／他）吓跑',
    '当恋人跟我过分亲密的时候，我会感到内心紧张',
    '我害怕一个人独处',
    '我愿意把我内心的想法和感觉告诉恋人，我觉得这让我感到很舒服',
    '我想跟恋人非常亲密的原望，有时会把恋人吓跑',
    '我试图避免与恋人太过于亲近',
    '我需要我的恋人一再地保证他／她是爱我的，这样我才感到心安',
    '我觉得我与恋人亲近是比较容易的',
    '我觉得自己有时会要求（强迫）恋人对我表示出更多的情感和安心',
    '我发现让我依赖恋人，是一件困难的事情',
    '我并不是常常担心被恋人抛弃',
    '我不喜欢跟恋人太过于亲近',
    '如果我无法得到恋人的注意和关心，我会心烦意乱或者生气',
    '我跟恋人无话不谈',
    '我发现恋人并不愿意像我亲近她（／他）那样来亲近我',
    '我经常与恋人讨论我所遇到的问题和我的担忧',
    '如果我还没有恋人的话，我会感到有点焦虑和不安',
    '我觉得依赖恋人是很自在的事情',
    '如果恋人不能象我所希望的那样在我身边时，我会感到受挫',
    '我并不在意从恋人那里寻找安慰，建议，得到帮助',
    '如果在我需要的时候，恋人却不在我身边，我会感到沮丧，难过',
    '在需要的时候，我向恋人求助，是很有用的',
    '当恋人不赞同我时，我会自我怀疑自己是不是太差劲了',
    '我会在很多事情上向恋人求助，包括寻求安慰和得到承诺',
    '当恋人不花时间和我在一起时，我会感到怨恨',
  ])
  const options = ref(['非常不赞成', '比较不赞成', '有点不赞成', '不确定', '有点赞成', '比较赞成', '非常赞成'])

  // start from 1
  const reverseNo = [3, 15, 19, 22, 25, 27, 29, 31, 33, 35]

  function submit(answers: MaybeRef<number[]>) {
    let AScore = 0.00
    let BScore = 0.00
    const ans = unref(answers)
    for (let i = 0; i < ans.length; i++) {
      const answer = ans[i]
      // 奇数题为A分题，偶数题为B分题，从1开始计数ng
      if ((i + 1) % 2 !== 0) {
        if (reverseNo.includes(i + 1))
          AScore += (8 - answer + 1)
        else
          AScore += (answer + 1)
      }
      else {
        if (reverseNo.includes(i + 1))
          BScore += (8 - answer + 1)
        else
          BScore += (answer + 1)
      }
    }
    AScore = AScore / 18
    BScore = BScore / 18

    result.value.safety = AScore * 3.2893296 + BScore * 5.4725318 - 11.5307833
    result.value.fear = AScore * 7.2371075 + BScore * 8.1776448 - 32.3553266
    result.value.obsession = AScore * 3.9246754 + BScore * 9.7102446 - 28.4573220
    result.value.cold = AScore * 7.3654621 + BScore * 4.9392039 - 22.22810880

    return result.value
  }

  return {
    id,
    name,
    describe,
    questions,
    options,
    submit,
  }
}
