<template>
  <div class="user">
    <div class="search">
      <!-- <czm-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      /> -->
      <czm-form v-bind="searchFormConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CzmForm } from '../../../../base-ui/form/index'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    CzmForm
  },
  setup() {
    // 传入的参数和类型
    /* const formItems: IFormItem[] = [
      {
        type: 'input',
        label: 'id',
        placeholder: '请输入ID'
      },
      {
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码',
        placeholder: '请输入密码'
      },
      {
        type: 'select',
        label: '喜欢的运动',
        placeholder: '请选择喜欢的运动',
        options: [
          {
            title: '篮球',
            value: 'basketball'
          },
          {
            title: '跑步',
            value: 'run'
          }
        ]
      },
      {
        type: 'datepicker',
        label: '创建时间',
        otherOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ] */

    // label宽度
    // const labelWidth = '120px'

    // 样式
    // const itemStyle = {
    //   padding: '20px 60px'
    // }

    // 响应式布局
    // const colLayout = {
    //   span: 8
    // }

    // 把上面都整合到一起 到search.config.ts文件中

    return {
      // formItems,
      // labelWidth,
      // itemStyle,
      // colLayout

      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
