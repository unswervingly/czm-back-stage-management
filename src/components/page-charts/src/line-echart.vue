<template>
  <div class="line-echart">
    <base-echart :options="lineOptions"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from 'vue'

import { BaseEchart } from '../../../base-ui/echarts/index'

import { IEchartXAxisLabel, IEchartValueData } from '../types/index'

const props = withDefaults(
  defineProps<{ labels: IEchartXAxisLabel[]; values: IEchartValueData[] }>(),
  { labels: () => [], values: () => [] }
)

const lineOptions = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
