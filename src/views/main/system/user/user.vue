<template>
  <div class="user">
    <div class="search">
      <!-- 所有属性一个一个定义的 -->
      <!-- <czm-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      /> -->

      <!-- 所有属性整合一起 + 双向绑定-->
      <!-- <czm-form v-bind="searchFormConfig" :formData="formData" /> -->

      <!-- 所有属性整合一起 + v-model的使用可以避免违反了单向数据流-->
      <czm-form v-bind="searchFormConfig" v-model="formData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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
    /* const labelWidth = '120px' */

    // 样式
    /* const itemStyle = {
      padding: '20px 60px'
    } */

    // 响应式布局
    /* const colLayout = {
      span: 8
    } */

    // 把上面都整合到一起 到search.config.ts文件中

    // 双向绑定的功能
    // 1. 使用reactive，再使用v-model有弊端
    /* const formData = reactive({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    }) */

    // 2. 使用ref，使用v-model
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return {
      // formItems,
      // labelWidth,
      // itemStyle,
      // colLayout

      searchFormConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
