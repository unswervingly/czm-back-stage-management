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
        <czm-card title="分类商品数量(玫瑰图)"></czm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <czm-card title="分类商品的销量"> </czm-card>
      </el-col>
      <el-col :span="12">
        <czm-card title="分类商品的收藏"></czm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../../../store/index'

import { CzmCard } from '../../../../base-ui/card/index'
import { PicEchart } from '../../../../components/page-charts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    CzmCard,
    PicEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashBoardDataAction')

    // 获取state中dashboard的categoryGoodsCount数据，并且改变数据格式
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    return {
      categoryGoodsCount
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
