<template>
  <div class="pic-echart">
    <base-echart :options="picOption"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
import { BaseEchart } from '../../../base-ui/echarts/index'

import { IDataType } from '../types/index'

const props = withDefaults(
  defineProps<{
    picData: IDataType[]
  }>(),
  {
    picData: () => []
  }
)

const picOption = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.picData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
