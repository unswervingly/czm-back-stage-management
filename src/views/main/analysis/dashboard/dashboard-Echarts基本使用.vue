<template>
  <div class="dashboard">
    <!-- 为 ECharts 准备一个宽高 DOM -->
    <div ref="divRef" :style="{ width: '600px', height: '500px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

// 1.安装ECharts
// npm install echarts

// 2.引入ECharts
import * as echarts from 'echarts'

// 3.初始化ECharts对象，并且设置配置进行绘制
// 通过 echarts.init(dom,theme,options) 初始化
// dom 是你要展示在哪个节点上要有宽高
// theme是主题
// options是附加参数
// 通过 .setOption方法设置绘制的数据

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()

    onMounted(() => {
      // 基于准备好的dom，初始化echarts实例
      const echartInstance = echarts.init(divRef.value!, 'dark', {
        renderer: 'svg'
      })

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例',
          subtext: '哈哈哈'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      echartInstance.setOption(option)
    })

    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
