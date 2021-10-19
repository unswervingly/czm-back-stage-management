<template>
  <div class="statistical">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip effect="dark" :content="panelData.tips" placement="top">
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <div class="content">
      <czm-countup
        :number="panelData.number1"
        :option="panelData.amount === 'saleroom' ? countOption2 : countOption1"
      />
    </div>
    <div class="footer">
      <span>
        {{ panelData.subtitle }}
        <czm-countup
          :number="panelData.number2"
          :option="
            panelData.amount === 'saleroom' ? countOption2 : countOption1
          "
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CzmCountup } from '../../../base-ui/count-up/index'

export default defineComponent({
  components: {
    CzmCountup
  },
  props: {
    panelData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup() {
    const countOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const countOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }

    return {
      countOption1,
      countOption2
    }
  }
})
</script>

<style scoped lang="less">
@h: 38px;

.statistical {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgb(0 0 0, 0.1);

  height: 130px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: left;

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);

    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);

    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;

    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
