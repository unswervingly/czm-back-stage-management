<template>
  <div class="dashboard">
    <!-- 1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item"></statistical-panel>
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间图标 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <czm-card title="分类商品数量(饼图)">
          <pic-echart :picData="categoryGoodsCount"></pic-echart>
        </czm-card>
      </el-col>
      <el-col :span="10">
        <czm-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </czm-card>
      </el-col>
      <el-col :span="7">
        <czm-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </czm-card>
      </el-col>
    </el-row>

    <!-- 3.底部图标 -->
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
import { StatisticalPanel } from '../../../../components/statistical-panel/index'
import {
  PicEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '../../../../components/page-charts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    CzmCard,
    StatisticalPanel,
    PicEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    // 1.发起数据统计的网络请求
    const store = useStore()
    store.dispatch('dashboard/getDashBoardDataAction')

    // 2.获取顶部PanelData
    const topPanelData = computed(() => store.state.dashboard.topPanelData)

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

    // 获取state中 dashboard的addressGoodsSale 数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
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
