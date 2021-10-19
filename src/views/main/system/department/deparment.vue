<template>
  <div class="deparment">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <!-- 使用弹窗组件，会有弹窗 -->
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigComputed"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../../../store/index'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'
import { PageModal } from '../../../../components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '../../../../hooks/usePageSearch'
import { usePageModal } from '../../../../hooks/usePageModal'

export default defineComponent({
  name: 'deparment',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 搜索和重置
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // 2.动态添加
    // 注意 store是异步请求所以要用computed 返回更新后的配置内容
    const store = useStore()
    // 当数据变化时，通过computed改变并且返回modalConfig 来让页面是刷新
    const modalConfigComputed = computed(() => {
      // 使用find是引用modalConfig，不会是一个新的对象
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.entireDepartment.map(
        (parentIdItem) => {
          return { title: parentIdItem.name, value: parentIdItem.id }
        }
      )

      // 引用不会是一个新的对象 返回更新后的配置内容
      return modalConfig
    })

    // 新建和编辑的点击是否显示弹窗，点击编辑的按钮弹窗 内容就会把我编辑的内容给到弹窗里面
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      modalConfigComputed,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
