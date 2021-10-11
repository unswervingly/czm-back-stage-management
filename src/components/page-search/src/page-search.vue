<template>
  <div class="page-search">
    <!-- 所有属性整合一起 + v-model的使用可以避免违反了单向数据流 -->
    <czm-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高阶检索</h1>
      </template>

      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
  setup() {
    // 2. 使用ref，使用v-model
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return {
      formData
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
