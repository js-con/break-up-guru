import { type MaybeRef, ref, unref } from 'vue'

export function useLAS() {
  const id = 'LAS'
  const name = 'LAS爱情态度量表'

  const describe = [
    '这个量表主要是想了解你对爱情所持的态度。',
    '题目中的“TA”，是指目前与你密切交往的男/女朋友（请以您目前的恋人为回答依据),',
    '若目前没有恋人，请就上任对象作答;或者，请您想像一个理想的伴侣作答,',
    '请针对每一题项所叙述的情形，选出您认为最能反映您实际状况的选项。',
  ]

  const result: any = ref({
    romantic: 0,
    game: 0,
    companion: 0,
    realistic: 0,
    occupy: 0,
    giving: 0,
  })

  const dimensionMap: Record<string, number[]> = {
    romantic: [1, 7, 13, 19, 25, 31, 37],
    game: [2, 8, 14, 20, 26, 32, 38],
    companion: [3, 9, 15, 21, 27, 33, 39],
    realistic: [4, 10, 16, 22, 28, 34, 40],
    occupy: [5, 11, 17, 23, 29, 35, 41],
    giving: [6, 12, 18, 24, 30, 36, 42],
  }

  const questions = ref([
    '我和TA属于一见钟情型',
    '我很难明确地说我和TA是何时从友情变成爱情的',
    '对TA做承诺之前，我会考虑TA将来可能变成的样子',
    '我总是试着帮TA度过难关',
    '和TA的关系不太对劲时，我的身体就会不舒服',
    '我试着不给TA明确的承诺',
    '在选择TA之前，我会先试着仔细规划我的人生',
    '我宁愿自己痛苦，也不愿意让TA受苦',
    '失恋时，我会十分沮丧，甚至会有自杀的念头',
    '我相信TA不知道我的一些事，也不会受到伤害',
    '我和TA很来电',
    '我需要先经过一阵子的关心和照顾，才有可能产生爱情',
    '我和TA最好有相似的背景',
    '有时候，我得防范TA发现我还有其他情人',
    '我和TA的亲密行为是很热情且很令我满意',
    '我有时会因为想到自己正在谈恋爱而兴奋地睡不着觉',
    '我可以很容易、很快地忘掉过往的恋情',
    'TA如何看待我的家人是我选择TA的主要考量',
    '我希望和曾经相爱的TA是永远的朋友',
    '当TA不注意我时，我会全身不舒服',
    '我和TA的爱情关系是最理想因为是由长久的友谊发展而成的',
    '我觉得我和TA是天生一对',
    '自从和TA谈恋爱后，我很难专心在其他任何事情上',
    'TA将来会不会是一个好父亲/母亲是我选择TA的一个重要因素',
    '除非我先让TA快乐，否则我不会感到快乐',
    '如果TA知道我和其他人做了某些事，TA会不高兴',
    '我和TA的感情、亲密行为进展得很快',
    '我和TA的友情随着时间逐渐转变为爱情',
    '当TA太依赖我时，我会想和TA疏远一些',
    '我通常愿意牺牲自己的愿望，达成TA的愿望',
    '我和TA的爱情是一种深刻的友情，而不是一种很神秘的情感',
    'TA可以任意使用我的东西',
    '我和TA非常了解彼此',
    '当我怀疑TA和其他人在一起时，我就无法放松',
    'TA如何看待我的职业会是我选择TA的一个考量',
    'TA的外貌符合我的理想标准',
    '我享受和TA及一些不同的情人玩爱情游戏',
    '当TA对我发脾气时，我仍然全心全意、无条件地爱TA',
    '在和TA深入交往之前，我会试着了解TA是否有良好的遗传基因',
    '为了TA，我愿意忍受任何事情',
    '如果TA忽略我一阵子，我会做出一些傻事来吸引TA的注意力',
    '我和TA的爱情关系是最令人满意，因为是由良好友情发展成的',
  ])
  const options = ref(['完全不符合', '不符合', '没意见', '符合', '完全符合'])

  function submit(answers: MaybeRef<number[]>) {
    const ans = unref(answers)
    if (ans.length !== 42)
      return

    for (const [idx, choice] of ans.entries()) {
      for (const dimension in dimensionMap) {
        if (dimensionMap[dimension].includes(idx + 1))
          result.value[dimension] += (choice + 1)
      }
    }

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
