<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <czm-form v-bind="modalConfig" v-model="dialogFormData"></czm-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

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
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    // 定义dialogVisible属性 说明是否对话框可见，在el-dialog中 v-model使用来控制对话框显示隐藏
    const dialogVisible = ref(false)

    // dialogFormData属性 来实现和CzmForm组件的双向绑定
    const dialogFormData = ref<any>({})

    // 点击编辑之后才赋值到dialogFormData里面，使用watch侦听 defaulitInfo的变化
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // 根据props.modalConfig.formItems中的配置，给dialogFormData设置
        for (const item of props.modalConfig.formItems) {
          dialogFormData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击弹窗的 确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...dialogFormData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...dialogFormData.value }
        })
      }
    }

    return {
      dialogVisible,
      dialogFormData,

      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
