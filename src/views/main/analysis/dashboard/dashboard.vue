<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <czm-card title="分类商品数量(饼图)">
          <pic-echart :picData="categoryGoodsCount"></pic-echart>
        </czm-card>
      </el-col>
      <el-col :span="10">
        <czm-card title="不同城市商品销量"></czm-card>
      </el-col>
      <el-col :span="7">
        <czm-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </czm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <czm-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </czm-card>
      </el-col>
      <el-col :span="12">
        <czm-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </czm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../../../store/index'

import { CzmCard } from '../../../../base-ui/card/index'
import { PicEchart } from '../../../../components/page-charts/index'
import { RoseEchart } from '../../../../components/page-charts/index'
import { LineEchart } from '../../../../components/page-charts/index'
import { BarEchart } from '../../../../components/page-charts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    CzmCard,
    PicEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashBoardDataAction')

    // 获取state中 dashboard的categoryGoodsCount 数据，并且改变数据格式
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    // 获取state中 dashboard的categoryGoodsSale 数据
    const categoryGoodsSale = computed(() => {
      const labels: string[] = []
      const values: any[] = []

      const goodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of goodsSale) {
        labels.push(item.name)
        values.push(item.goodsCount)
      }

      return {
        labels,
        values
      }
    })

    // 获取state中 dashboard的categoryGoodsFavor 数据
    const categoryGoodsFavor = computed(() => {
      const labels: string[] = []
      const values: any[] = []

      const goodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of goodsFavor) {
        labels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        labels,
        values
      }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor
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
