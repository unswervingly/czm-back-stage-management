<template>
  <div class="page-search">
    <!-- 所有属性整合一起 + v-model的使用可以避免违反了单向数据流 -->
    <czm-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高阶检索</h1>
      </template>

      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </czm-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CzmForm } from '../../../base-ui/form/index'

export default defineComponent({
  name: 'PageSearch',
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    CzmForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 2. 使用ref，使用v-model
    // 双向绑定的属性应该是由配置文件的field来决定的
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
      // 相当于 创建了
      /* {
        id: '',
        name: '',
        password: '',
        sport: '',
        createAt: ''
      } */
    }
    // formData属性 根据配置动态设置，来实现和CzmForm组件的双向绑定
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置按钮时, 操作
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }

    // 2.优化三: 当用户点击搜索按钮时, 操作
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,

      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: pink;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
