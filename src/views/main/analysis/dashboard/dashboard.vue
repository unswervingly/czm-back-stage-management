<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <czm-card title="分类商品数量(饼图)"> </czm-card>
      </el-col>
      <el-col :span="10">
        <czm-card title="不同城市商品销量"></czm-card>
      </el-col>
      <el-col :span="7">
        <czm-card title="分类商品数量(玫瑰图)"></czm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <czm-card title="分类商品的销量">
          <base-echart :options="options"></base-echart>
        </czm-card>
      </el-col>
      <el-col :span="12">
        <czm-card title="分类商品的收藏"></czm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import { CzmCard } from '../../../../base-ui/card/index'
import { BaseEchart } from '../../../../base-ui/echarts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    CzmCard,
    BaseEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashBoardDataAction')

    const options = {
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

    return {
      options
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;

  .row {
    margin-top: 20px;
  }
}
</style>
