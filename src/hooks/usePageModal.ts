import { ref } from 'vue'

import { PageModal } from '../components/page-modal/index'

type CallBackFn = (item?: any) => void

export function usePageModal(newCb?: CallBackFn, editCb?: CallBackFn) {
  // pageModalRef 是获取PageModal对象
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  // 默认初始化值 为了点击编辑的按钮弹窗 内容就会把我编辑的内容给到弹窗里面
  const defaultInfo = ref({})

  // 从PageContent传递函数，点击去操作PageModal的dialogVisible属性 来实现弹窗
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }

  return {
    pageModalRef,
    defaultInfo,
    handleNewData,
    handleEditData
  }
}
