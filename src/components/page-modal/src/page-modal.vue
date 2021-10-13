<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <czm-form v-bind="modalConfig" v-model="dialogFormData"></czm-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { CzmForm } from '../../../base-ui/form/index'

export default defineComponent({
  name: 'PageModal',
  components: {
    CzmForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    // 定义dialogVisible属性 说明是否对话框可见，在el-dialog中 v-model使用来控制对话框显示隐藏
    const dialogVisible = ref(true)

    // dialogFormData属性 来实现和CzmForm组件的双向绑定
    const dialogFormData = ref({})
    return {
      dialogVisible,
      dialogFormData
    }
  }
})
</script>

<style scoped></style>
